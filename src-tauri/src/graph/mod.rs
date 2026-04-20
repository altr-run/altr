//! The shared graph — SQLite-backed store + in-process event bus.
//!
//! Architectural rule (CLAUDE.md §5): every artifact is a typed node in
//! the graph. Agents are subscribers that react to graph events and write
//! new nodes back. When in doubt, "add it to the graph, then render it."

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum NodeEvent {
    Created { id: String, kind: String },
    Updated { id: String, kind: String },
    Deleted { id: String, kind: String },
}

// Event bus + SQLite layer to be implemented in M1 (Week 1–2).
// Keep the surface narrow: `subscribe()`, `emit()`, repo traits per node kind.
