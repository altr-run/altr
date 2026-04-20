//! Agent runtimes.
//!
//! Each agent is a long-running Tokio task supervised here. They subscribe
//! to graph events, filter by relevance, invoke the LLM (streaming), and
//! write results back as new nodes. Cancellation tokens propagate through
//! task trees so an abort cleanly tears down LLM streams + child processes.
//!
//! See CLAUDE.md §5 ("Agents are processes, not functions") + §9
//! ("Don't build a generic agent framework — Pax and Eng are concrete classes").

pub mod eng;
pub mod pax;
