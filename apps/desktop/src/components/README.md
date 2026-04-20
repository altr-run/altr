# src/components

Generic UI primitives only. No business logic, no Tauri calls, no graph types.

Shape the primitives like shadcn/ui — borrow the idea, don't install the package (CLAUDE.md §8). Examples to build when needed: `Button`, `Input`, `Dialog`, `Command` (⌘K palette), `Kbd`.

If a component is feature-specific (e.g. `SpecEditor`, `TicketCard`, `PaxPresence`), it lives under `src/features/<feature>/` instead.
