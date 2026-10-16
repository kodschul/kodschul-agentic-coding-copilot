---
description: Ergänzt fehlende Tests für eine FocusList-Aktion
agent: agent
tools: ['read', 'search', 'edit', 'execute/runInTerminal']
argument-hint: Aktion, z. B. set_priority
---

Ergänze fehlende Tests für die Aktion `${input:aktion:Name der Aktion, z. B. set_priority}`.

1. Lies `focuslist/actions/${input:aktion}.py` und den vorhandenen Test unter `tests/actions/`.
2. Liste zuerst auf, welche Fälle fehlen: Erfolgsfall, unbekannte id, ungültige Eingabe, Grenzfälle.
3. Ergänze nur die fehlenden Tests. Bestehende Tests nicht ändern.
4. Führe `uv run pytest` aus und melde das Ergebnis.
