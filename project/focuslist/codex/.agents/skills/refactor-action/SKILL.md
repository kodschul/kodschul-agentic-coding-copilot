---
name: refactor-action
description: Vereinfacht eine FocusList-Aktion, ohne ihr Verhalten zu ändern. Nur explizit aufrufen mit $refactor-action <aktion>, z. B. $refactor-action complete-task.
---

# Aktion refaktorieren

Refaktoriere die beim Aufruf genannte Aktion (z. B. `complete-task`), ohne ihr Verhalten zu ändern. Ist keine Aktion genannt, frage danach.

1. Führe `npm test` aus. Ist ein Test rot, brich ab und melde das.
2. Lies `src/actions/<aktion>.ts`, die übrigen Dateien in `src/actions/` und `AGENTS.md`.
3. Liste vor jeder Änderung auf: doppelter Code (auch in anderen Aktionen), Verstöße gegen die Projektregeln, unklare Namen. Ein Satz pro Punkt.
4. Setze nur diese Punkte um. Exportierte Signaturen, Fehlermeldungen und Tests bleiben unverändert; keine neuen Abhängigkeiten.
5. Führe `npm run lint` und `npm test` aus und nenne jede geänderte Datei.
