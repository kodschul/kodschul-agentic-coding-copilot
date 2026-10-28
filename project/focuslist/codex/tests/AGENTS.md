# Testregeln

Gilt für alle Dateien unter `tests/` (Muster `tests/**/*.test.ts`).

- Importiere `test` aus `node:test` und `assert` aus `node:assert/strict`.
- Rufe `useTempStore()` aus `tests/helpers.ts` am Dateianfang auf, damit jeder Test eine eigene leere Datei bekommt.
- Ein `test(...)` prüft genau ein Verhalten; der Testname beschreibt es auf Deutsch.
- Prüfe Fehlerfälle mit `assert.throws(() => ..., /Teil der Meldung/)`.
