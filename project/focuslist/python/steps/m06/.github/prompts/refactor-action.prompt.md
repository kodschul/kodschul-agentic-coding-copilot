---
description: Vereinfacht eine FocusList-Aktion, ohne ihr Verhalten zu ändern
agent: agent
tools: ['read', 'search', 'edit', 'execute']
argument-hint: Aktion, z. B. complete_task
---

Refaktoriere die Aktion `${input:aktion:Name der Aktion, z. B. complete_task}`, ohne ihr Verhalten zu ändern.

1. Führe `uv run pytest` aus. Ist ein Test rot, brich ab und melde das.
2. Lies `focuslist/actions/${input:aktion}.py`, die übrigen Dateien in `focuslist/actions/` und [copilot-instructions.md](../copilot-instructions.md).
3. Liste vor jeder Änderung auf: doppelter Code (auch in anderen Aktionen), Verstöße gegen die Projektregeln, unklare Namen. Ein Satz pro Punkt.
4. Setze nur diese Punkte um. Öffentliche Signaturen, Fehlermeldungen und Tests bleiben unverändert; keine neuen Abhängigkeiten.
5. Führe `uv run ruff check .` und `uv run pytest` aus und nenne jede geänderte Datei.
