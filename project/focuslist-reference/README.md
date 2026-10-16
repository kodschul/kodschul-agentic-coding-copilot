# FocusList – Referenzstand v7 (JS/TS)

Fertiger Stand nach Modul 9. Dient zum Vergleichen und als Rettungsanker, wenn ein eigener Zwischenstand nicht weiterkommt. Python-Fassung: [`../focuslist-reference-python/`](../focuslist-reference-python/).

## Setup und Befehle

```bash
npm install
npm run lint            # ESLint 9
npm test                # node:test über tsx, jede Datei mit eigener temporärer tasks.json
npm start -- list-tasks
```

| Befehl | Wirkung | Seit |
| --- | --- | --- |
| `add-task <titel> [low\|medium\|high] [JJJJ-MM-TT]` | Aufgabe anlegen | v0, Datum ab v7 |
| `list-tasks [--status open\|done] [--priority …] [--sort due-date]` | Aufgaben anzeigen, mit id | v0, Sortierung ab v7 |
| `complete-task <id>` | Aufgabe erledigen | v0 |
| `set-priority <id> <prio>` | Priorität ändern | v2 (Skill) |
| `search-tasks <begriff>` | im Titel suchen | v3 (Transfer-Skill) |
| `bulk-set-priority <prio> <id> …` | Priorität mehrerer Aufgaben ändern | v5 (Transfer-Skill) |
| `complete-tasks <id> …` | mehrere Aufgaben erledigen | v7 (Agenten-Kette) |

## Artefakte je Modul

| Modul | Datei(en) |
| --- | --- |
| 4 Instructions | `.github/copilot-instructions.md`, `.github/instructions/tests.instructions.md` |
| 5 Skills | `.github/skills/add-focuslist-action/` (SKILL.md + `action-template.ts`) |
| 6 Prompts | `.github/prompts/focuslist-code-review.prompt.md`, `add-missing-tests.prompt.md`, `generate-docs.prompt.md`; Transfer: `.github/skills/filter-and-search-tasks/` |
| 7 Agents | `.github/agents/focuslist-test-agent.agent.md` (live gebaut), `focuslist-docs-agent`, `focuslist-review-agent`, `focuslist-code-agent`, `focuslist-feature-team` (Kette) |
| 8 Automatisierung | `.vscode/tasks.json`, `.github/hooks/run-tests.json` + `run-tests.mjs` (Stop-Hook), `.vscode/mcp.json`; Transfer: `.github/skills/bulk-priority-update/` |
| 9 Spec-Driven | `openspec/` (archiviert: `sort-by-due-date`, umgesetzt: `bulk-complete-tasks`, Entwurf: `recurring-tasks`), `.github/prompts/opsx-*.prompt.md` + `.github/skills/openspec-*` aus `openspec init`, Dashboard-Bilder in `docs/screenshots/` |

`.vscode/mcp.json` erwartet den Ordner `focuslist-tickets/` neben dem Projektordner.
