/**
 * LLM streaming helpers — subscribe to per-token diffs emitted from Rust
 * via Tauri events. The Pax spec-editor extension is the primary consumer.
 *
 * See CLAUDE.md §5 ("Streaming is a first-class UX primitive") for why this
 * is a separate module and not buried in a single hook.
 */
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

export interface TokenEvent {
  run_id: string;
  node_id: string; // target graph node being written
  delta: string;
  done: boolean;
}

export async function onToken(
  handler: (ev: TokenEvent) => void,
): Promise<UnlistenFn> {
  return listen<TokenEvent>("altr://token", (e) => handler(e.payload));
}
