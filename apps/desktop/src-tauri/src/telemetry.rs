//! Tracing + (future) Sentry setup.
//!
//! Structured logs with `agent`, `run_id`, `node_type` fields per CLAUDE.md §7.

use tracing_subscriber::{fmt, prelude::*, EnvFilter};

pub fn init() {
    // `RUST_LOG=altr=debug,tauri=info` etc. Default quiet-but-useful.
    let filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("altr=info,warn"));

    tracing_subscriber::registry()
        .with(fmt::layer().with_target(true).compact())
        .with(filter)
        .init();
}
