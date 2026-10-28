# FocusList (Python)

Persönliche Aufgabenliste als CLI, Kursprojekt „Agentic Coding mit GitHub Copilot“.

## Starten

```bash
uv sync && uv run ruff check . && uv run pytest
uv run focuslist list-tasks
```

Erwartet: Lint ohne Befund, `uv run pytest` → `15 passed`.

## Befehle

| Befehl | Wirkung | Beispiel |
| --- | --- | --- |
| `add-task <titel> [low\|medium\|high]` | Aufgabe anlegen, Priorität Standard `medium` | `uv run focuslist add-task "Steuererklärung" high` |
| `list-tasks [--status open\|done] [--priority low\|medium\|high]` | Aufgaben mit id anzeigen, optional gefiltert | `uv run focuslist list-tasks --status open` |
| `complete-task <id>` | Aufgabe als erledigt markieren | `uv run focuslist complete-task 800d79d5` |
| `set-priority <id> <low\|medium\|high>` | Priorität einer Aufgabe ändern | `uv run focuslist set-priority 800d79d5 low` |
| `search-tasks <begriff>` | Aufgaben über einen Begriff im Titel finden | `uv run focuslist search-tasks steuer` |

Die id im Beispiel ist ein Platzhalter; gültige ids zeigt `list-tasks`.
