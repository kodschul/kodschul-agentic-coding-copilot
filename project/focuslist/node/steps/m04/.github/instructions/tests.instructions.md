---
applyTo: "test/**"
---

# Regeln für Tests

- Test-Runner ist `node:test` mit `node:assert/strict`, keine weiteren Pakete.
- Dateiname: `test/<bereich>.test.js`, ein Bereich pro Datei (z. B. `tasks.test.js`, `api.test.js`); nur Dateien mit `.test.js` laufen in `npm test`.
- Server immer über `startTestServer()` aus `test/helpers.js` starten: freier Port, eigene Kopie von `data/tasks.json`.
- Server nach dem Test schließen (`after` bzw. `afterEach` mit `app.close()`).
- Tests, die Daten ändern, starten mit `beforeEach` jeweils einen frischen Server.
- Formulare mit `app.postForm(pfad, felder)` absenden; Redirects werden nicht verfolgt, Status 302 und `location` prüfen.
- Pro Funktion mindestens einen Normalfall und einen Fehlerfall testen.
- Testnamen auf Deutsch und als Satz: was passiert unter welcher Bedingung.
- Gespeicherten Zustand mit `app.readTasks()` prüfen, nicht nur die Antwort.
- Keine festen Ports, keine Wartezeiten (`setTimeout`), keine Abhängigkeit von der Reihenfolge der Tests.
