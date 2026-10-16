# FocusList – Referenzstand v7 (Python)

Fertiger Stand nach Modul 9, inhaltlich identisch zur [JS/TS-Fassung](../focuslist-reference/). Gleiche Befehle, gleiche Meldungen, gleiche Regeln.

## Setup und Befehle

```bash
uv sync
uv run ruff check .
uv run pytest            # jede Testfunktion mit eigener temporärer tasks.json (tests/conftest.py)
uv run focuslist list-tasks
```

Befehle und Versionsstufen: siehe Tabelle in der [JS/TS-Fassung](../focuslist-reference/README.md#setup-und-befehle).

## Unterschiede zur JS/TS-Fassung

| Thema | JS/TS | Python |
| --- | --- | --- |
| Aktionen | `src/actions/<aktion>.ts` (kebab-case) | `focuslist/actions/<aktion>.py` (snake_case) |
| Fehler | `throw new Error(...)` | `raise ValueError(...)` |
| Tests | `node:test`, `tests/helpers.ts` | `pytest`, Fixture in `tests/conftest.py` |
| Lint + Test | `npm run lint && npm test` | `uv run ruff check . && uv run pytest` |
| Stop-Hook | `node .github/hooks/run-tests.mjs` | `uv run python .github/hooks/run_tests.py` |
| MCP-Server | `npx` (Node.js nötig) | ebenfalls `npx`: Node.js LTS muss installiert sein |

Alle anderen Artefakte (`.github/`, `.vscode/`, `openspec/`) entsprechen der JS/TS-Fassung, nur mit Python-Pfaden.
