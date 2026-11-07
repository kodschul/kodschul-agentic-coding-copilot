---
name: test-writer
description: Schreibt Tests mit node:test für FocusList-Code (Routen, API, Filter, Funktionen in src/). Einsetzen, wenn Tests für neuen oder geänderten Code fehlen, wenn nach Tests gefragt wird oder ein Feature erst mit Tests als fertig gilt.
argument-hint: "[Datei, Route oder Funktion, z. B. GET /api/tasks]"
---

# Test-Writer

Schreibt verständliche Tests, die echtes Verhalten prüfen, und liefert sie grün ab.

## Wann einsetzen

- Neue oder geänderte Route, Funktion oder View ohne passende Tests
- Anfrage wie „schreib Tests für …“, „ist das getestet?“
- Fehler gefunden: erst ein Test, der ihn zeigt, dann der Fix

## Schritte

1. **Code lesen.** Die genannte Stelle in `src/` öffnen und verstehen: Eingaben, Ausgaben, Statuscodes, was gespeichert wird. Vorhandene Tests in `test/` lesen, damit nichts doppelt entsteht.
2. **Fälle ableiten.** Für jede Funktion bzw. Route mindestens:
   - **Normalfall:** typische, gültige Eingabe.
   - **Grenzfall:** Ränder von Wertebereichen (leere Liste, genau 100 Zeichen, letzte ID, Filter `all`).
   - **Fehlerfall:** ungültige oder fehlende Eingabe, unbekannte ID, falscher Status → erwarteter Fehlercode und **nichts gespeichert**.
   Die Fälle vor dem Schreiben als kurze Liste nennen.
3. **Test nach Vorlage schreiben.** Aufbau aus [test-template.js](./test-template.js) übernehmen. Datei `test/<bereich>.test.js`, bestehende Datei ergänzen, wenn der Bereich schon existiert. Regeln aus `.github/instructions/tests.instructions.md` einhalten.
4. **Ausführen.** `npm test` im Terminal starten.
5. **Bei Rot reparieren.** Fehlermeldung lesen und entscheiden:
   - Test falsch (Tippfehler, falsche Erwartung) → Test korrigieren.
   - Code falsch → Fehler kurz beschreiben und den Code nur ändern, wenn der Auftrag das erlaubt; sonst den roten Test stehen lassen und melden.
   Dann Schritt 4 wiederholen, bis alles grün ist.
6. **Berichten.** Kurze Zusammenfassung ausgeben (siehe unten).

## Abnahmekriterien

- `npm test` läuft grün, die Anzahl der Tests ist gestiegen.
- Jede neue Route bzw. Funktion hat Normal-, Grenz- und Fehlerfall.
- Jeder Test prüft ein konkretes Ergebnis (Status, Inhalt, gespeicherte Daten), nicht nur „kein Fehler“.
- Ein Test würde rot, wenn das geprüfte Verhalten kaputtgeht (gedanklich prüfen: Zeile im Code entfernen → Test schlägt fehl?).
- Keine Änderung an `data/tasks.json`, keine neuen npm-Pakete.

## Bericht

```text
Getestet: <Route/Funktion>
Neue Tests: <Anzahl> in <Datei>
Fälle: Normalfall …, Grenzfall …, Fehlerfall …
npm test: <x> Tests, alle grün
Auffällig: <Fehler im Code oder „nichts“>
```
