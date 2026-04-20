-- 0001_initial.sql
-- Initial Altr graph schema. Everything is a node; edges are first-class.
--
-- Design notes:
--   * ULIDs everywhere (26 chars, lexicographically sortable). Generated in Rust
--     and passed in — SQLite has no native ULID fn and we don't want randomness
--     leaking into the DB layer.
--   * `created_at` / `updated_at` are ISO-8601 strings (RFC 3339). SQLite's
--     DATETIME affinity is sloppy; strings keep round-tripping with chrono
--     predictable.
--   * `payload` is a JSON blob per node type. The typed wrappers live in Rust
--     (see `src-tauri/src/graph/`). We keep the column so adding node types
--     doesn't require a migration per field.
--   * `events` is append-only — the graph broadcast channel in Rust replays
--     from here on startup. Do not UPDATE or DELETE rows from `events`.

PRAGMA foreign_keys = ON;

-- ──────────────────────────────────────────────────────────────────────────
-- nodes: the single universal table. Every artifact lives here.
-- Typed views (projects, tickets, specs…) project a subset of this.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE nodes (
    id          TEXT PRIMARY KEY,              -- ULID
    kind        TEXT NOT NULL,                 -- 'project' | 'spec' | 'ticket' | 'message' | 'artifact' | 'run'
    parent_id   TEXT REFERENCES nodes(id) ON DELETE CASCADE,
    title       TEXT NOT NULL DEFAULT '',
    payload     TEXT NOT NULL DEFAULT '{}',    -- JSON; shape depends on `kind`
    created_at  TEXT NOT NULL,                 -- RFC 3339
    updated_at  TEXT NOT NULL,
    deleted_at  TEXT                           -- soft delete; NULL = live
) STRICT;

CREATE INDEX idx_nodes_kind          ON nodes (kind)          WHERE deleted_at IS NULL;
CREATE INDEX idx_nodes_parent        ON nodes (parent_id)     WHERE deleted_at IS NULL;
CREATE INDEX idx_nodes_kind_parent   ON nodes (kind, parent_id, updated_at DESC)
                                     WHERE deleted_at IS NULL;

-- ──────────────────────────────────────────────────────────────────────────
-- edges: typed relationships between nodes. Cheap to add, cheap to query.
-- Used for ticket dependencies, spec→ticket decomposition, artifact→ticket.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE edges (
    id          TEXT PRIMARY KEY,
    src         TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    dst         TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    kind        TEXT NOT NULL,                 -- 'depends_on' | 'derived_from' | 'produced' | 'references'
    payload     TEXT NOT NULL DEFAULT '{}',    -- JSON
    created_at  TEXT NOT NULL
) STRICT;

CREATE UNIQUE INDEX uniq_edges ON edges (src, dst, kind);
CREATE INDEX idx_edges_src      ON edges (src, kind);
CREATE INDEX idx_edges_dst      ON edges (dst, kind);

-- ──────────────────────────────────────────────────────────────────────────
-- tickets: typed projection over nodes. We keep it as a separate table because
-- tickets have enough structure (autonomy, agent, status) that SQL-over-JSON
-- would be brittle for the board view.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE tickets (
    id             TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
    project_id     TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    spec_id        TEXT REFERENCES nodes(id) ON DELETE SET NULL,
    status         TEXT NOT NULL CHECK (status IN ('todo','in_progress','review','done','cancelled')),
    agent          TEXT NOT NULL CHECK (agent IN ('pax','eng','dex','rae','human')),
    autonomy       TEXT NOT NULL CHECK (autonomy IN ('autopilot','copilot','human-only')),
    priority       INTEGER NOT NULL DEFAULT 0,
    budget_tokens  INTEGER,                    -- NULL = no cap
    worktree_path  TEXT,                       -- populated by Eng when run starts
    pr_url         TEXT,                       -- populated on PR open
    created_at     TEXT NOT NULL,
    updated_at     TEXT NOT NULL
) STRICT;

CREATE INDEX idx_tickets_project_status ON tickets (project_id, status, priority DESC, updated_at DESC);
CREATE INDEX idx_tickets_agent_status   ON tickets (agent, status);

-- ──────────────────────────────────────────────────────────────────────────
-- spec_versions: immutable snapshots of spec content. TipTap doc (JSON)
-- serialized per save. Used for diff + undo across Pax edits.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE spec_versions (
    id          TEXT PRIMARY KEY,
    spec_id     TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    doc         TEXT NOT NULL,                 -- TipTap JSON
    author      TEXT NOT NULL,                 -- 'human' | 'pax' | ...
    created_at  TEXT NOT NULL
) STRICT;

CREATE INDEX idx_spec_versions_spec ON spec_versions (spec_id, created_at DESC);

-- ──────────────────────────────────────────────────────────────────────────
-- messages: channel entries — human prompts, agent responses, system notes.
-- The channel view is a stream from here, scoped to a project.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE messages (
    id          TEXT PRIMARY KEY REFERENCES nodes(id) ON DELETE CASCADE,
    project_id  TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    author      TEXT NOT NULL,                 -- agent id or 'human'
    body        TEXT NOT NULL,                 -- markdown
    reply_to    TEXT REFERENCES nodes(id) ON DELETE SET NULL,
    created_at  TEXT NOT NULL
) STRICT;

CREATE INDEX idx_messages_project ON messages (project_id, created_at DESC);

-- ──────────────────────────────────────────────────────────────────────────
-- events: append-only audit + replay log. Every graph mutation emits one row
-- here. The in-Rust event bus hydrates from this on startup so subscribers
-- can catch up deterministically.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE events (
    id          TEXT PRIMARY KEY,              -- ULID (monotonic within a process)
    kind        TEXT NOT NULL,                 -- 'node.created' | 'node.updated' | 'edge.created' | 'ticket.status_changed' | ...
    subject_id  TEXT NOT NULL,                 -- node or edge id
    actor       TEXT NOT NULL,                 -- 'human' | 'pax' | ...
    payload     TEXT NOT NULL DEFAULT '{}',    -- JSON diff / context
    created_at  TEXT NOT NULL
) STRICT;

CREATE INDEX idx_events_created ON events (created_at);
CREATE INDEX idx_events_subject ON events (subject_id, created_at);

-- ──────────────────────────────────────────────────────────────────────────
-- runs: one row per Eng/Pax invocation. Holds token accounting, status,
-- and the pointer back to the ticket or spec that triggered it.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE runs (
    id             TEXT PRIMARY KEY,
    ticket_id      TEXT REFERENCES nodes(id) ON DELETE SET NULL,
    spec_id        TEXT REFERENCES nodes(id) ON DELETE SET NULL,
    agent          TEXT NOT NULL CHECK (agent IN ('pax','eng','dex','rae')),
    status         TEXT NOT NULL CHECK (status IN ('queued','running','paused','done','failed','cancelled')),
    tokens_in      INTEGER NOT NULL DEFAULT 0,
    tokens_out     INTEGER NOT NULL DEFAULT 0,
    started_at     TEXT NOT NULL,
    ended_at       TEXT,
    error          TEXT                        -- populated on failed/cancelled
) STRICT;

CREATE INDEX idx_runs_ticket ON runs (ticket_id, started_at DESC);
CREATE INDEX idx_runs_agent  ON runs (agent, status);

-- ──────────────────────────────────────────────────────────────────────────
-- settings: app-level key/value. Reserved keys start with `altr.`.
-- Provider API keys DO NOT live here — they go in the OS keychain (see
-- `src-tauri/src/keychain.rs`). This table is for non-secret preferences.
-- ──────────────────────────────────────────────────────────────────────────
CREATE TABLE settings (
    key         TEXT PRIMARY KEY,
    value       TEXT NOT NULL,
    updated_at  TEXT NOT NULL
) STRICT;
