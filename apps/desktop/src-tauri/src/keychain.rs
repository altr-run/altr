//! OS keychain wrapper for BYOK secrets (Anthropic, OpenAI, GitHub).
//!
//! Never log, never serialize to SQLite, never send in error reports.
//! See CLAUDE.md §2 non-negotiable #3.

use keyring::Entry;
use thiserror::Error;

const SERVICE: &str = "run.altr.desktop";

#[derive(Debug, Error)]
pub enum KeychainError {
    #[error("keychain backend error: {0}")]
    Backend(#[from] keyring::Error),
}

pub fn set(name: &str, value: &str) -> Result<(), KeychainError> {
    Entry::new(SERVICE, name)?.set_password(value)?;
    Ok(())
}

pub fn get(name: &str) -> Result<Option<String>, KeychainError> {
    match Entry::new(SERVICE, name)?.get_password() {
        Ok(v) => Ok(Some(v)),
        Err(keyring::Error::NoEntry) => Ok(None),
        Err(e) => Err(e.into()),
    }
}

pub fn delete(name: &str) -> Result<(), KeychainError> {
    match Entry::new(SERVICE, name)?.delete_credential() {
        Ok(()) | Err(keyring::Error::NoEntry) => Ok(()),
        Err(e) => Err(e.into()),
    }
}
