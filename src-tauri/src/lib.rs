//! Altr desktop — Tauri app entry point.
//!
//! This is the thin shell. All real work lives in submodules:
//!   - `commands`  : `#[tauri::command]` handlers, one file per feature
//!   - `graph`     : SQLite-backed graph store + event bus
//!   - `agents`    : Pax + Eng runtimes (Tokio tasks subscribed to graph events)
//!   - `providers` : LLM provider clients (Anthropic first)
//!   - `keychain`  : OS keychain wrapper for BYOK secrets
//!   - `telemetry` : tracing + Sentry setup
//!
//! See CLAUDE.md §5 for the architectural rationale.

pub mod agents;
pub mod commands;
pub mod graph;
pub mod keychain;
pub mod providers;
pub mod telemetry;

use tauri_plugin_sql::{Migration, MigrationKind};
use tracing::info;

#[tauri::command]
fn altr_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

#[tauri::command]
fn ping() -> &'static str {
    "pong"
}

/// Returns the full migration ledger. Order matters — tauri-plugin-sql applies
/// them in ascending `version` and records what's been run in its own table,
/// so don't reuse versions and don't edit an applied migration in place.
fn migrations() -> Vec<Migration> {
    vec![Migration {
        version: 1,
        description: "initial graph schema",
        sql: include_str!("../migrations/0001_initial.sql"),
        kind: MigrationKind::Up,
    }]
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    telemetry::init();
    info!(target: "altr", "starting altr-desktop v{}", env!("CARGO_PKG_VERSION"));

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:altr.db", migrations())
                .build(),
        )
        .invoke_handler(tauri::generate_handler![altr_version, ping])
        .run(tauri::generate_context!())
        .expect("error while running altr");
}
