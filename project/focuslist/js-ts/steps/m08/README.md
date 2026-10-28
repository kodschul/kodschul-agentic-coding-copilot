# FocusList (JS/TS)

Persönliche Aufgabenliste als CLI, Kursprojekt „Agentic Coding mit GitHub Copilot“.

## Starten

```bash
npm install && npm run lint && npm test
npm start -- list-tasks
```

Erwartet: Lint ohne Befund, `npm test` → `ℹ tests 18`, `ℹ pass 18`.

**MCP-Pfad:** `.vscode/mcp.json` startet den Filesystem-Server mit `${workspaceFolder}/../focuslist-tickets`. Der Pfad funktioniert im eigenen Arbeitsordner, in dem `focuslist/` und `focuslist-tickets/` nebeneinanderliegen (siehe `project/README.md` im Kursmaterial).

## Befehle

| Befehl | Wirkung | Beispiel |
| --- | --- | --- |
| `add-task <titel> [low\|medium\|high]` | Aufgabe anlegen, Priorität Standard `medium` | `npm start -- add-task "Steuererklärung" high` |
| `list-tasks [--status open\|done] [--priority low\|medium\|high]` | Aufgaben mit id anzeigen, optional gefiltert | `npm start -- list-tasks --status open` |
| `complete-task <id>` | Aufgabe als erledigt markieren | `npm start -- complete-task 800d79d5` |
| `set-priority <id> <low\|medium\|high>` | Priorität einer Aufgabe ändern | `npm start -- set-priority 800d79d5 low` |
| `search-tasks <begriff>` | Aufgaben über einen Begriff im Titel finden | `npm start -- search-tasks steuer` |
| `bulk-set-priority <low\|medium\|high> <id> …` | Priorität mehrerer Aufgaben ändern, alles oder nichts | `npm start -- bulk-set-priority high 800d79d5 3699133f` |

Die id im Beispiel ist ein Platzhalter; gültige ids zeigt `list-tasks`.
