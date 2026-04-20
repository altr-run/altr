/**
 * Altr — app shell.
 *
 * This is the placeholder loft. Intentionally unstyled beyond tokens
 * so Week 1 builds out the sidebar → canvas → channel skeleton before
 * any polish pass (CLAUDE.md §9: "ship ugly first").
 */
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export default function App() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    invoke<string>("altr_version")
      .then(setVersion)
      .catch(() => setVersion("(backend not ready)"));
  }, []);

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr 320px",
        height: "100vh",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Project sidebar — Pax/Eng nav lives here eventually. */}
      <aside
        style={{
          background: "var(--bg-raised)",
          borderRight: "1px solid var(--border-subtle)",
          padding: "var(--s-6) var(--s-4)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "22px",
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Altr
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            marginTop: "var(--s-2)",
            lineHeight: 1.5,
          }}
        >
          studio loft · v0.0.1
        </p>
      </aside>

      {/* Main canvas — specs / tickets / channel render here. */}
      <section
        style={{
          padding: "var(--s-12)",
          overflow: "auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "32px",
            letterSpacing: "-0.02em",
            margin: 0,
            color: "var(--text-primary)",
          }}
        >
          Good morning.
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginTop: "var(--s-4)",
            maxWidth: "56ch",
            lineHeight: 1.6,
          }}
        >
          The loft is empty. Create a project to open the first spec —
          Pax will be ready when the runtime is wired.
        </p>
        <p
          style={{
            color: "var(--text-muted)",
            marginTop: "var(--s-8)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          }}
        >
          backend: {version ?? "…"}
        </p>
      </section>

      {/* Team channel / decision queue — humans and agents interleave here. */}
      <aside
        style={{
          background: "var(--bg-raised)",
          borderLeft: "1px solid var(--border-subtle)",
          padding: "var(--s-6) var(--s-4)",
        }}
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          Channel
        </p>
      </aside>
    </main>
  );
}
