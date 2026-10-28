# FocusList – Referenzstand v7 (Codex-Variante)

Gleicher Endstand wie die JS/TS-Fassung (v7, nach Modul 9), aber mit den Anpassungen für **OpenAI Codex** statt der `.github/`- und `.vscode/`-Dateien für GitHub Copilot. Code, Tests und `openspec/` sind identisch. Zweck: zeigen, wie jedes Copilot-Konzept aus dem Kurs in Codex aussieht. Keine Übung, sondern Nachschlagewerk für Modul 10.

Im Kursmaterial liegen in `focuslist/codex/` nur die Codex-Dateien. Den vollständigen Projektordner erzeugt `node <kursmaterial>/project/focuslist/catch-up.mjs codex arbeitsordner/focuslist-codex`: JS/TS-Endstand plus diese Dateien, ohne `.github/` und `.vscode/` (Liste in `_entfernt.txt`).

Stand: 10/2026. Quellen: offizielle Codex-Doku (`developers.openai.com/codex/...` leitet seit 10/2026 auf `learn.chatgpt.com/docs/...` weiter), [github.com/openai/codex](https://github.com/openai/codex), [OpenSpec Supported Tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md).

## Setup und Befehle

Voraussetzungen: Node.js ≥ 20.19, Git, ein ChatGPT-Konto oder ein OpenAI-API-Key für Codex.

```bash
npm install
npm run lint            # ESLint 9
npm test                # node:test über tsx, 23 Tests
npm start -- list-tasks

# Codex CLI (eine der drei Varianten)
npm install -g @openai/codex
brew install --cask codex
curl -fsSL https://chatgpt.com/codex/install.sh | sh

codex                   # im Projektordner starten, beim ersten Start anmelden
```

Die FocusList-Befehle (`add-task`, `list-tasks`, `complete-task`, `set-priority`, `search-tasks`, `bulk-set-priority`, `complete-tasks`) funktionieren wie in der JS/TS-Fassung (`npm start -- <befehl>`).

**Arbeitsordner:** Der MCP-Server in `.codex/config.toml` erwartet `../focuslist-tickets`. Darum den erzeugten Ordner `arbeitsordner/focuslist-codex/` neben `arbeitsordner/focuslist-tickets/` (Kopie von `project/focuslist-tickets/`) anlegen und Codex in `arbeitsordner/focuslist-codex/` starten.

**Wichtig für `.codex/`:** Codex lädt `.codex/config.toml`, `.codex/hooks.json` und `.codex/agents/` nur, wenn das Projekt als vertrauenswürdig gilt (Eintrag `trust_level = "trusted"` unter `[projects."<absoluter Pfad>"]` in `~/.codex/config.toml`). Ohne Vertrauen gelten nur `AGENTS.md` und `.agents/skills/`. Hooks müssen zusätzlich einmal über `/hooks` bestätigt werden; nach jeder Änderung am Hook erneut.

## Ordnerstruktur

```text
codex/
├── AGENTS.md                      # Projektregeln (statt copilot-instructions.md)
├── tests/AGENTS.md                # Testregeln (statt tests.instructions.md)
├── .agents/skills/                # Skills, inkl. ehemaliger Prompts und OpenSpec-Skills
│   ├── add-focuslist-action/      # SKILL.md + action-template.ts
│   ├── filter-and-search-tasks/
│   ├── bulk-priority-update/
│   ├── focuslist-code-review/     # ehemals Prompt-File, nur explizit ($…)
│   ├── add-missing-tests/         # ehemals Prompt-File, nur explizit
│   ├── refactor-action/           # ehemals Prompt-File, nur explizit
│   ├── generate-docs/             # ehemals Prompt-File, nur explizit
│   ├── focuslist-feature-team/    # Koordinator der Agenten-Kette, nur explizit
│   └── openspec-*/                # aus `openspec init --tools codex`
├── .codex/
│   ├── config.toml                # Sandbox, Freigaben, MCP-Server, Subagent-Limit
│   ├── agents/*.toml              # Code-, Test-, Review-, Docs-Agent
│   ├── hooks.json                 # Stop-Hook
│   └── hooks/run-tests.mjs
├── openspec/  src/  tests/  docs/
└── package.json …
```

## Zuordnung Copilot → Codex

| Konzept (Modul) | Copilot (JS/TS-Endstand) | Codex (dieser Ordner) | Unterschiede |
| --- | --- | --- | --- |
| Projektregeln (M4) | `.github/copilot-instructions.md` | `AGENTS.md` | Inhalt gleich, Pfadverweise angepasst. Codex liest `AGENTS.md` vom Projekt-Root bis zum Startverzeichnis, höchstens 32 KiB gesamt (`project_doc_max_bytes`). Persönliche Regeln: `~/.codex/AGENTS.md`. [Quelle](https://learn.chatgpt.com/docs/agent-configuration/agents-md) |
| Pfadbezogene Regeln (M4) | `.github/instructions/tests.instructions.md` mit `applyTo: "tests/**/*.test.ts"` | `tests/AGENTS.md` | Kein Glob-Muster, sondern Ordner. Codex lädt `tests/AGENTS.md` automatisch nur, wenn die Sitzung in `tests/` (oder tiefer) startet. Darum verweist die Root-`AGENTS.md` ausdrücklich darauf. [Quelle](https://learn.chatgpt.com/docs/agent-configuration/agents-md) |
| Skills (M5, Transfer M6, M8) | `.github/skills/<name>/SKILL.md` | `.agents/skills/<name>/SKILL.md` | Gleiches Format (`name`, `description` im Frontmatter, Zusatzdateien im Ordner). Aufruf explizit mit `$name` oder `/skills`, sonst automatisch über die `description`. Persönliche Skills: `~/.agents/skills/`. [Quelle](https://learn.chatgpt.com/docs/build-skills) |
| Prompt-Files (M6) | `.github/prompts/*.prompt.md`, Aufruf `/name` | `.agents/skills/{focuslist-code-review,add-missing-tests,refactor-action,generate-docs}/` + `agents/openai.yaml` mit `allow_implicit_invocation: false` | Custom Prompts (`~/.codex/prompts/`, Aufruf `/prompts:name`) sind laut Doku **veraltet** und nur benutzerweit, nicht im Repo teilbar. Ersatz: Skill, der nur explizit läuft (`$generate-docs`). Kein `${file}`/`${input:…}`: Datei bzw. Aktion steht im Aufruf, z. B. `$add-missing-tests set-priority`. [Quelle](https://learn.chatgpt.com/docs/custom-prompts) |
| Chat-Modi Ask / Edit / Agent (M2) | Modus-Auswahl im Chat | `/permissions`; `sandbox_mode` + `approval_policy` in `.codex/config.toml` | Codex arbeitet immer agentisch; gesteuert wird, was ohne Rückfrage erlaubt ist: `read-only`, `workspace-write`, `danger-full-access`; Freigaben `on-request` oder `never`. Ein reiner Ask-Modus entspricht etwa `read-only`. [Quelle](https://learn.chatgpt.com/docs/config-file/config-reference) |
| Custom Agents (M7) | `.github/agents/focuslist-*.agent.md` | `.codex/agents/focuslist-*-agent.toml` (Subagents) | Pflichtfelder `name`, `description`, `developer_instructions`. **Keine Werkzeugliste wie `tools:`**: `sandbox_mode`, `approval_policy` und `mcp_servers` erbt der Subagent von der Sitzung. „Ändere nichts“ (Review-, Test-Agent) gilt daher nur über die Anweisung. Start per Auftrag im Chat („starte focuslist_review_agent …“), Wechsel zwischen Threads mit `/subagents`. [Quelle](https://learn.chatgpt.com/docs/agent-configuration/subagents) |
| Agenten-Kette (M7, M9) | `.github/agents/focuslist-feature-team.agent.md` mit `agents: [...]` | Skill `$focuslist-feature-team` startet die drei Subagents nacheinander | Codex kennt kein Feld, das einem Agenten feste Unter-Agenten zuweist. Die Doku nennt Skills und `AGENTS.md` als Weg, Delegation anzustoßen; die Reihenfolge steht deshalb im Skill. |
| VS Code Tasks (M8) | `.vscode/tasks.json` | keine Entsprechung | Codex hat keine Tasks. `npm run lint` und `npm test` aus `package.json` bleiben die Befehle; `AGENTS.md` nennt sie als Fertig-Kriterium. |
| Agent-Hook Stop (M8) | `.github/hooks/run-tests.json` + `run-tests.mjs` | `.codex/hooks.json` + `.codex/hooks/run-tests.mjs` | Gleiche Idee, anderes Ausgabeformat: Codex erwartet bei Exit 0 immer JSON auf stdout; `{"decision":"block","reason":"…"}` setzt die Arbeit mit `reason` als neuer Anweisung fort. Hooks brauchen Projekt-Vertrauen und eine Bestätigung per `/hooks`. Befehl läuft im Startverzeichnis der Sitzung, darum Codex im Projektordner starten. [Quelle](https://learn.chatgpt.com/docs/hooks) |
| MCP-Server (M8) | `.vscode/mcp.json`, Schlüssel `servers`, `${workspaceFolder}/../focuslist-tickets` | `.codex/config.toml`, Tabelle `[mcp_servers.focuslist_tickets]`, Pfad `../focuslist-tickets` | TOML statt JSON, kein `type`-Feld. Keine Variable wie `${workspaceFolder}`; wie relative `args` aufgelöst werden, ist nicht dokumentiert (getestet: Start im Projektordner findet `../focuslist-tickets`). Alternative mit absolutem Pfad, benutzerweit: `codex mcp add focuslist_tickets -- npx -y @modelcontextprotocol/server-filesystem /abs/pfad/focuslist-tickets`. Name mit `_` wie in den Doku-Beispielen. [Quelle](https://learn.chatgpt.com/docs/extend/mcp?surface=cli) |
| OpenSpec (M9) | `.github/skills/openspec-*` + `.github/prompts/opsx-*.prompt.md` | `.agents/skills/openspec-*` | `openspec init --tools codex` erzeugt für Codex nur Skills, keine Prompts. Aufruf `$openspec-propose`, `$openspec-apply-change`, `$openspec-archive-change` statt `/opsx-propose` usw. `openspec/` selbst ist identisch; in `openspec/config.yaml` fehlt nur der Copilot-Block `githubCopilot`. [Quelle](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md) |
| CI / ohne Editor | – | `codex exec` | Nicht-interaktiv, Standard-Sandbox `read-only`; Schreiben mit `codex exec --sandbox workspace-write "<Auftrag>"`. In GitHub Actions die Action `openai/codex-action` nutzen. [Quelle](https://learn.chatgpt.com/docs/non-interactive-mode) |

## Ohne direkte Entsprechung

- **`.vscode/tasks.json`:** keine Codex-Tasks; Skripte in `package.json`.
- **Werkzeugliste pro Agent (`tools:`):** nicht vorhanden; Rechte kommen aus Sandbox und Freigaben der Sitzung. Einzelne Fähigkeiten lassen sich nur abschalten (`features.shell_tool = false` u. a.).
- **`applyTo`-Globmuster:** nur ordnerweise `AGENTS.md`, wirksam ab Startverzeichnis.
- **Prompt-Variablen (`${file}`, `${selection}`, `${input:…}`):** keine Entsprechung in Skills; Angaben stehen im Aufruf.
- **Repo-weit geteilte Prompt-Files:** Custom Prompts sind benutzerweit und veraltet; Skills ersetzen sie.

## Beispielaufrufe in Codex

```text
$add-focuslist-action Aktion rename-task: Titel einer Aufgabe ändern
$focuslist-code-review src/actions/set-priority.ts
$add-missing-tests search-tasks
$generate-docs
$focuslist-feature-team openspec/changes/bulk-complete-tasks
$openspec-propose Wiederkehrende Aufgaben (täglich, wöchentlich)
```

Hinweis zu MCP: Der Filesystem-Server nimmt den Pfad aus `args` nur, solange der Client keine MCP-Roots meldet; meldet Codex Roots, gelten diese. Den freigegebenen Ordner zeigt das Tool `list_allowed_directories`.
