# FocusList — Referenz (v7)

Vollständig fertiger Stand von FocusList, wie er sich ergibt, wenn alle Fähigkeiten aus Modul 4-9 tatsächlich angewendet wurden. Kein Startzustand — dient als Vergleichspunkt/Fallback, nicht als Vorlage zum Abschreiben.

## Code

- `src/models/task.ts` — Datenmodell (inkl. `dueDate`, ergänzt in v7).
- `src/storage/json-store.ts` — einziger Zugriffspunkt auf `tasks.json`.
- `src/actions/` — `add-task`, `list-tasks`, `complete-task` (v0/v1), `set-priority` (v2), `sort-by-due-date` (v7).
- `src/cli.ts` — CLI-Einstiegspunkt, verdrahtet alle Aktionen.
- `tests/actions/` — Erfolgs- und Fehlerfall je Aktion.

## Agentische Fähigkeiten je Modul

| Modul                       | Artefakt                                                                                                                                                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4 – Custom Instructions     | [.github/copilot-instructions.md](.github/copilot-instructions.md)                                                                                                                                                                             |
| 5 – Skills                  | [.github/skills/add-focuslist-action/SKILL.md](.github/skills/add-focuslist-action/SKILL.md)                                                                                                                                                   |
| 6 – Custom Prompts          | [.github/prompts/](.github/prompts/) — `explain-selection`, `focuslist-code-review`, `add-missing-tests`, `generate-docs`                                                                                                                      |
| 7 – Custom Agents           | [.github/agents/](.github/agents/) — `explain-only`, `focuslist-test-agent`                                                                                                                                                                    |
| 8 – Automatisierung & MCP   | [.vscode/tasks.json](.vscode/tasks.json), [.github/hooks/pre-commit-test.md](.github/hooks/pre-commit-test.md) (+ Quelltext in `scripts/git-hooks/pre-commit`), [.github/mcp/focuslist-mcp-config.json](.github/mcp/focuslist-mcp-config.json) |
| 9 – Spec-Driven Development | [openspec/](openspec/) — `archive/sort-by-due-date` (umgesetzt, ergibt v7), `in-progress/recurring-tasks`, `changes/bulk-complete-tasks` (Platzhalter)                                                                                         |

## Setup

```
npm install
npm run lint
npm test
npm start -- list-tasks
```
