---
applyTo: "tests/**/*.test.ts"
---

# Testregeln

- Importiere `test` aus `node:test` und `assert` aus `node:assert/strict`.
- Rufe `useTempStore()` aus `tests/helpers.ts` am Dateianfang auf, damit jeder Test eine eigene leere Datei bekommt.
- Ein `test(...)` prüft genau ein Verhalten; der Testname beschreibt es auf Deutsch.
- Fehlerfälle werden mit `assert.throws(() => ..., /Teil der Meldung/)` geprüft.
