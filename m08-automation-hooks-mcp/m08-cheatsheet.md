# Cheatsheet Modul 8: Tasks, Hooks & MCP

## Überblick

| Baustein | Datei | Auslöser | Zweck |
| --- | --- | --- | --- |
| VS Code Task | `.vscode/tasks.json` | Mensch, **Tasks: Run Task** | wiederkehrende Befehle für alle gleich |
| Agent Hook | `.github/hooks/run-tests.json` + Skript | Ereignis `agentStop` (Alias `Stop`) im Agentenlauf | Agent meldet erst fertig, wenn Tests grün sind |
| MCP-Server | `.vscode/mcp.json` | Tool-Aufruf im Chat | externe Daten, z. B. Tickets, gezielt anbinden |

## Tasks

| Befehl / Feld | Wirkung |
| --- | --- |
| **Tasks: Run Task** | Task aus der Liste starten |
| **Tasks: Run Test Task** | Standard-Testtask (`group.kind: "test"`, `isDefault: true`) starten |
| `"command": "npm run lint && npm test"` | JS/TS: Lint, nur bei Erfolg Tests |
| `"command": "uv run ruff check --output-format=concise . && uv run pytest"` | Python: dasselbe |
| `"problemMatcher": ["$eslint-stylish"]` | ESLint-Fehler ins Problems-Panel |
| eigener Matcher mit `regexp` | Ruff-Fehler ins Problems-Panel |

## Agent Hooks

| Feld / Wert | Wirkung |
| --- | --- |
| `"version": 1` | Dateiformat |
| `"hooks": { "agentStop": [ … ] }` | Befehle, bevor der Agent beendet |
| `"command": "node .github/hooks/run-tests.mjs"` | JS/TS-Skript |
| `"command": "uv run python .github/hooks/run_tests.py"` | Python-Skript |
| `"timeoutSec": 120` | Abbruch nach 120 s (Standard 30; Alias `timeout`) |
| stdin `stop_hook_active: true` | Agent wurde schon einmal blockiert: nicht erneut blockieren |
| stdout leer | Agent darf beenden |
| stdout `{"decision": "block", "reason": "…"}` | Agent arbeitet mit `reason` weiter |
| `echo '{}' \| node .github/hooks/run-tests.mjs` | Skript ohne Agent testen |

Status: Preview; Session Target **Copilot**, lokal zusätzlich `chat.useHooks`.

## MCP

| Befehl / Feld | Wirkung |
| --- | --- |
| `"servers": { "focuslist-tickets": { … } }` | ein Server je Schlüssel |
| `"type": "stdio"`, `"command": "npx"` | lokaler Prozess über Node.js (ab 20.19) |
| `"args": ["-y", "@modelcontextprotocol/server-filesystem", "${workspaceFolder}/../focuslist-tickets"]` | Filesystem-Server mit genau einem Ordner |
| **MCP: List Servers** | Server starten, stoppen, Ausgabe zeigen |
| **MCP: Reset Trust** | Vertrauensentscheidung zurücksetzen |
| **Configure Tools** im Chat | Server-Tools ein- und abwählen |
| `tools: ['focuslist-tickets/*']` in `.agent.md` | alle Tools des Servers für einen Agenten |

## Faustregeln

| Regel | Grund |
| --- | --- |
| Hook ersetzt keine CI | holt Fehler nur früher in den Agentenlauf |
| neue Hooks erst beobachten, dann blockieren | Fehlalarme blockieren sonst jeden Lauf |
| ein Ordner pro Server, verändernde Tools abwählen | Rechte minimal halten |
| Antworten mit MCP-Daten gegen die Quelle prüfen | Tool-Aufruf sichtbar, sonst geraten |

_Stand: 10/2026, Quellen: [Hooks](https://code.visualstudio.com/docs/copilot/customization/hooks), [Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference), [MCP-Server](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)._
