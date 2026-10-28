---
name: add-missing-tests
description: Ergänzt fehlende Tests für eine FocusList-Aktion. Nur explizit aufrufen mit $add-missing-tests <aktion>, z. B. $add-missing-tests set-priority.
---

# Fehlende Tests ergänzen

Ergänze fehlende Tests für die beim Aufruf genannte Aktion (z. B. `set-priority`). Ist keine Aktion genannt, frage danach.

1. Lies `src/actions/<aktion>.ts` und den vorhandenen Test unter `tests/actions/`.
2. Liste zuerst auf, welche Fälle fehlen: Erfolgsfall, unbekannte id, ungültige Eingabe, Grenzfälle.
3. Ergänze nur die fehlenden Tests nach `tests/AGENTS.md`. Bestehende Tests nicht ändern.
4. Führe `npm test` aus und melde das Ergebnis.
