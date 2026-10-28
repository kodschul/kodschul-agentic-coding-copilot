# FocusList (Python)

Persönliche Aufgabenliste als CLI, Kursprojekt „Agentic Coding mit GitHub Copilot“, Endstand v7 nach Modul 9.
Inhaltlich identisch zur JS/TS-Fassung: gleiche Befehle, gleiche Meldungen, gleiche Regeln.

## Setup und Befehle

```bash
uv sync
uv run ruff check .
uv run pytest            # 23 Tests, jede Testfunktion mit eigener temporärer tasks.json (tests/conftest.py)
uv run focuslist list-tasks
```

| Befehl | Wirkung | Seit |
| --- | --- | --- |
| `add-task <titel> [low\|medium\|high] [JJJJ-MM-TT]` | Aufgabe anlegen | v0, Datum ab v7 |
| `list-tasks [--status open\|done] [--priority …] [--sort due-date]` | Aufgaben anzeigen, mit id | v0, Sortierung ab v7 |
| `complete-task <id>` | Aufgabe erledigen | v0 |
| `set-priority <id> <prio>` | Priorität ändern | v2 (Skill) |
| `search-tasks <begriff>` | im Titel suchen | v3 (Transfer-Skill) |
| `bulk-set-priority <prio> <id> …` | Priorität mehrerer Aufgaben ändern | v5/v6 (Transfer-Skill) |
| `complete-tasks <id> …` | mehrere Aufgaben erledigen | v7 (Agenten-Kette) |

Aufruf jeweils mit `uv run focuslist <befehl>`.

## Unterschiede zur JS/TS-Fassung

| Thema | JS/TS | Python |
| --- | --- | --- |
| Aktionen | `src/actions/<aktion>.ts` (kebab-case) | `focuslist/actions/<aktion>.py` (snake_case) |
| Fehler | `throw new Error(...)` | `raise ValueError(...)` |
| Tests | `node:test`, `tests/helpers.ts` | `pytest`, Fixture in `tests/conftest.py` |
| Lint + Test | `npm run lint && npm test` | `uv run ruff check . && uv run pytest` |
| Task-Matcher | `$eslint-stylish` | eigener `problemMatcher` für `ruff check --output-format=concise` |
| Stop-Hook | `node .github/hooks/run-tests.mjs` | `uv run python .github/hooks/run_tests.py` |
| MCP-Server | `npx` (Node.js nötig) | ebenfalls `npx`: Node.js LTS muss installiert sein |

Alle anderen Artefakte (`.github/`, `.vscode/`, `openspec/`) entsprechen der JS/TS-Fassung, nur mit Python-Pfaden.

**MCP-Pfad:** `.vscode/mcp.json` startet den Filesystem-Server mit `${workspaceFolder}/../focuslist-tickets`. Der Pfad funktioniert im eigenen Arbeitsordner, in dem `focuslist/` und `focuslist-tickets/` nebeneinanderliegen (siehe `project/README.md` im Kursmaterial).
