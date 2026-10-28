# FocusList (Python)

Persönliche Aufgabenliste als CLI, Kursprojekt „Agentic Coding mit GitHub Copilot“.

## Starten

```bash
uv sync && uv run ruff check . && uv run pytest
uv run focuslist list-tasks
```

Erwartet: Lint ohne Befund, `uv run pytest` → `8 passed`.
