# Cheatsheet Modul 7: Hooks und MCP

Stand: 11/2026, Hooks sind Preview. Quellen: [Hooks (VS Code)](https://code.visualstudio.com/docs/agent-customization/hooks), [Hooks reference (GitHub)](https://docs.github.com/en/copilot/reference/hooks-reference), [MCP servers (VS Code)](https://code.visualstudio.com/docs/agent-customization/mcp-servers), [Playwright MCP](https://github.com/microsoft/playwright-mcp)

## Instruction, Hook, MCP

| Baustein | Frage | Wirkt durch | Datei |
| --- | --- | --- | --- |
| Instruction | Was soll der Agent wissen? | Text im Kontext („bitte nicht“) | `AGENTS.md` |
| Hook | Was muss immer passieren oder darf nie passieren? | Skript außerhalb des Modells („geht nicht“) | `.github/hooks/*.json` |
| MCP | Welche Werkzeuge fehlen? | zusätzlicher Server mit Tools | `.mcp.json` |

## Hook-Datei

| Feld | Wert |
| --- | --- |
| Ort | `.github/hooks/<name>.json`, jede Datei wird geladen |
| `version` | `1` |
| `hooks` | `{ "<event>": [ { … } ] }` |
| `type` | `"command"` |
| `command` | z. B. `python .github/hooks/guard.py`, `node .github/hooks/guard.mjs` |
| `timeoutSec` | Standard 30; Guard 10, Checks 60 |

## Events

| Event | Zeitpunkt |
| --- | --- |
| `sessionStart`, `sessionEnd` | Sitzung beginnt / endet |
| `userPromptSubmitted` | Prompt abgeschickt |
| `preToolUse` | vor jedem Werkzeugaufruf |
| `postToolUse`, `postToolUseFailure` | nach (fehlgeschlagenem) Werkzeugaufruf |
| `agentStop` | Agent will Runde beenden |
| `subagentStart`, `subagentStop` | Subagent startet / endet |
| `preCompact` | vor dem Verdichten des Kontexts |
| `errorOccurred`, `notification`, `permissionRequest` | Fehler, Hinweis, Freigabe-Anfrage |

## preToolUse

| | Inhalt |
| --- | --- |
| stdin | `toolName`, `toolArgs`, `sessionId`, `timestamp`, `cwd` |
| blockieren | `{"permissionDecision": "deny", "permissionDecisionReason": "…"}` (Begründung Pflicht) |
| nichts tun | leere Ausgabe oder `{}` → normale Freigabe |
| Exit-Code | `0` = stdout wird gelesen; `2` = ablehnen |
| Timeout | Aufruf wird **nicht** blockiert |
| Tool-Namen | `bash`, `powershell`, `view`, `edit`, `create` (≠ Agent-Aliase `execute`, `read`, `edit`) |

## agentStop

| | Inhalt |
| --- | --- |
| stdin | u. a. `stop_hook_active`, `cwd` |
| weitere Runde erzwingen | `{"decision": "block", "reason": "…"}`, `reason` = nächster Prompt |
| fertig | `{}` |
| Schleifenschutz | bei `stop_hook_active: true` nicht blocken; nach 8 Blockaden endet die Runde |

## FocusList-Hooks (v4)

| Datei | Event | Python | Node.js |
| --- | --- | --- | --- |
| `guard.json` | `preToolUse` | `guard.py`: `.env*` (außer `.env.example`), `rm -rf`, `Remove-Item -Recurse` | `guard.mjs`: `.env*` (außer `.env.example`), `rm -rf` |
| `checks.json` | `agentStop` | `checks.py`: `pytest`, dazu `npm run build:css` falls `node_modules/` | `checks.mjs`: `node --test` |

## Hook testen

| Stack | Befehl |
| --- | --- |
| Python | `echo '{"toolName":"view","toolArgs":{"path":".env"}}' \| python .github/hooks/guard.py` |
| Node.js | `echo '{"toolName":"view","toolArgs":{"path":".env"}}' \| node .github/hooks/guard.mjs` |
| Checks | `echo '{}' \| python .github/hooks/checks.py` bzw. `… \| node .github/hooks/checks.mjs` |

## Hooks: Copilot vs. Local

| | Copilot-Harness | Local-Harness |
| --- | --- | --- |
| Event-Namen | camelCase (`preToolUse`) | PascalCase (`PreToolUse`) |
| Einschalten | Dateien in `.github/hooks/` | Einstellung `chat.useHooks` |

## MCP-Konfiguration

| Datei | Schlüssel | Harness |
| --- | --- | --- |
| `.mcp.json` | `mcpServers` | Copilot |
| `.vscode/mcp.json` | `servers` | Local |

| Feld | Beispiel |
| --- | --- |
| Servername | `"playwright"` |
| `command` | `"npx"` |
| `args` | `["@playwright/mcp@latest"]` |
| in Agent-`tools` | `playwright/*` |

## Playwright MCP

| | Wert |
| --- | --- |
| Paket | `@playwright/mcp`, Node 18+ |
| Optionen | `--headless`, `--isolated`, `--browser <name>` |
| Tools | `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_resize`, `browser_take_screenshot` |
| Server starten | Befehlspalette → „MCP: List Servers“ → Start |
| App-URL | Python `http://127.0.0.1:5000`, Node.js `http://localhost:3000` |

## Responsiv mit Tailwind

| Ziel | Klassen |
| --- | --- |
| mobil untereinander, ab 640 px nebeneinander | `flex flex-col sm:flex-row` |
| volle Breite mobil, feste Breite ab `sm` | `w-full sm:w-40` |
| Rest der Zeile füllen | `sm:flex-1` |
| lange Titel umbrechen | `break-words`, `min-w-0` |
| Buttons umbrechen lassen | `flex-wrap` |

## Sicherheit

| Regel | Warum |
| --- | --- |
| nur geprüfte MCP-Server | Server läuft mit eigenen Rechten |
| Tokens nie in `.mcp.json` | Datei wird mit dem Projekt geteilt |
| Freigaben aktiv lassen | Hook und MCP ersetzen keine Prüfung |
| Hook-Skripte schnell, ohne Netzwerk | Timeout lässt Aufrufe durch |
