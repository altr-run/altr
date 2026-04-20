//! LLM provider clients. Anthropic is the only v0.1 provider.
//!
//! All provider calls go through Rust (CLAUDE.md §9: "don't bundle the
//! Anthropic SDK into the webview"). Provider keys are fetched from the
//! OS keychain, never the SQLite DB.

// pub mod anthropic;
