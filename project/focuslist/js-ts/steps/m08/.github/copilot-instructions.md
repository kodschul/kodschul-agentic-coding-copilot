# FocusList – Projektregeln

FocusList ist eine CLI-Aufgabenliste in TypeScript (Node.js, `tsx`). Daten liegen in einer JSON-Datei, es gibt keine Datenbank und kein Framework.

## Struktur

- `src/models/task.ts`: Datenmodell `Task` und erlaubte Prioritäten.
- `src/storage/json-store.ts`: einziger Zugriff auf die JSON-Datei (`readTasks`, `writeTasks`).
- `src/actions/<aktion>.ts`: eine exportierte Funktion pro Aktion, Dateiname in kebab-case.
- `src/cli.ts`: verdrahtet jede Aktion als Unterbefehl.
- `tests/actions/<aktion>.test.ts`: Tests mit `node:test` und `node:assert/strict`.

## Regeln

1. Aktionen werfen bei ungültiger Eingabe einen `Error` mit deutscher, konkreter Meldung. Sie geben nie `null` oder `undefined` als Fehlersignal zurück.
2. Nur `json-store.ts` liest oder schreibt die Datei. Aktionen nutzen `readTasks`/`writeTasks`.
3. Eingabewerte wie Prioritäten werden über `src/actions/validation.ts` geprüft, nicht neu implementiert.
4. Aktionen, die mehrere Tasks ändern, arbeiten alles-oder-nichts: erst alle ids prüfen, dann speichern.
5. Jede neue Aktion bekommt einen Test für den Erfolgsfall und mindestens einen Fehlerfall.
6. Keine neuen Abhängigkeiten ohne ausdrückliche Anfrage.
