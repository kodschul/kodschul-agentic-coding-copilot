# FocusList (Python)

Persönliche Aufgabenliste als CLI, Kursprojekt „Agentic Coding mit GitHub Copilot“.

## Starten

```bash
uv sync && uv run ruff check .
uv run focuslist add-task "Steuererklärung" high
uv run focuslist list-tasks
uv run focuslist complete-task <id>
```

Tests gibt es in v0 noch nicht.
