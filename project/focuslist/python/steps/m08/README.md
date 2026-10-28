# FocusList (Python)

Persönliche Aufgabenliste als CLI, Kursprojekt „Agentic Coding mit GitHub Copilot“.

## Starten

```bash
uv sync && uv run ruff check . && uv run pytest
uv run focuslist list-tasks
```

Erwartet: Lint ohne Befund, `uv run pytest` → `18 passed`.

**MCP-Pfad:** `.vscode/mcp.json` startet den Filesystem-Server mit `${workspaceFolder}/../focuslist-tickets`. Der Pfad funktioniert im eigenen Arbeitsordner, in dem `focuslist/` und `focuslist-tickets/` nebeneinanderliegen (siehe `project/README.md` im Kursmaterial).

## Befehle

| Befehl | Wirkung | Beispiel |
| --- | --- | --- |
| `add-task <titel> [low\|medium\|high]` | Aufgabe anlegen, Priorität Standard `medium` | `uv run focuslist add-task "Steuererklärung" high` |
| `list-tasks [--status open\|done] [--priority low\|medium\|high]` | Aufgaben mit id anzeigen, optional gefiltert | `uv run focuslist list-tasks --status open` |
| `complete-task <id>` | Aufgabe als erledigt markieren | `uv run focuslist complete-task 800d79d5` |
| `set-priority <id> <low\|medium\|high>` | Priorität einer Aufgabe ändern | `uv run focuslist set-priority 800d79d5 low` |
| `search-tasks <begriff>` | Aufgaben über einen Begriff im Titel finden | `uv run focuslist search-tasks steuer` |
| `bulk-set-priority <low\|medium\|high> <id> …` | Priorität mehrerer Aufgaben ändern, alles oder nichts | `uv run focuslist bulk-set-priority high 800d79d5 3699133f` |

Die id im Beispiel ist ein Platzhalter; gültige ids zeigt `list-tasks`.
