/**
 * Shared graph types + event-bus client.
 *
 * Mirrors the Rust-side types in `src-tauri/src/graph/`. Keep these in sync
 * by hand until specta generation is wired (M1). See CLAUDE.md §5 for the
 * shared-graph architectural rationale.
 */

export type AgentId = "pax" | "eng" | "dex" | "rae" | "human";
export type Autonomy = "autopilot" | "copilot" | "human-only";

export type NodeType =
  | "project"
  | "spec"
  | "spec_version"
  | "ticket"
  | "message"
  | "event"
  | "artifact";

export interface NodeBase {
  id: string; // ULID
  type: NodeType;
  created_at: string;
  updated_at: string;
}

export interface Project extends NodeBase {
  type: "project";
  name: string;
  path: string | null; // local folder, if any
}

export interface Ticket extends NodeBase {
  type: "ticket";
  project_id: string;
  spec_id: string | null;
  title: string;
  body: string;
  autonomy: Autonomy;
  agent: AgentId;
  status: "todo" | "in_progress" | "blocked" | "done";
  depends_on: string[]; // ticket ids
}
