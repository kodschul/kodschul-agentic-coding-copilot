---
name: test-writer
description: Schreibt pytest-Tests für FocusList (Routen, API, Filter, Fachlogik in focuslist/tasks.py) nach fester Vorlage mit Normalfall, Grenzfall und Fehlerfall und führt sie aus. Verwenden, wenn Tests geschrieben, ergänzt oder repariert werden sollen oder eine neue Route ohne Tests entstanden ist.
argument-hint: "[Route, Datei oder Funktion, z. B. /api/tasks]"
---

# Skill: test-writer

Schreibt Tests, die etwas prüfen, nicht nur Tests, die grün sind.

## Wann einsetzen

- Eine Route, ein Filter oder eine Funktion in `focuslist/tasks.py` hat keine oder zu wenige Tests.
- Ein Feature ist fertig und soll abgesichert werden.
- Ein Test ist rot und soll repariert werden.

Nicht einsetzen für Änderungen am Produktcode. Der Skill schreibt nur unter `tests/`.

## Schritte

1. **Code lesen.** Die Route in `focuslist/routes.py` und die aufgerufene Funktion in `focuslist/tasks.py` öffnen. Notieren: Eingaben (Formularfelder, URL-Parameter, IDs), Ausgaben (Statuscode, Redirect, HTML-Text, JSON), Seiteneffekte (was in `data/tasks.json` landet).
2. **Fälle ableiten.** Für jede Route mindestens je einen Fall:
   - **Normalfall:** gültige Eingabe, erwartetes Ergebnis.
   - **Grenzfall:** Ränder der Regeln, z. B. Titel mit genau 1 und genau 100 Zeichen, leere Liste, letzte Aufgabe.
   - **Fehlerfall:** ungültige Eingabe oder unbekannte ID, z. B. leerer Titel → 400, ID 999 → 404.
   Die Fälle vor dem Schreiben als kurze Liste ausgeben.
3. **Test nach Vorlage schreiben.** Aufbau und Namensschema aus [test-template.py](./test-template.py) übernehmen. Eine Datei pro Thema: `tests/test_<thema>.py`. Bestehende Fixtures `client` und `app` aus `tests/conftest.py` nutzen, keine eigenen Kopien der Daten anlegen.
4. **Ausführen.** `pytest -q` im Projektordner starten.
5. **Bei Rot reparieren.** Erst klären, ob der Test oder der Code falsch ist:
   - Test falsch (Tippfehler, falsche Erwartung an Text) → Test korrigieren.
   - Code falsch (echter Fehler gefunden) → Test NICHT anpassen, sondern den Fehler im Bericht melden.
   Nie einen Test löschen, mit `skip` markieren oder die Prüfung abschwächen, nur damit er grün wird.
6. **Berichten.** Kurz zusammenfassen (Format unten).

## Prüfen, ob ein Test etwas prüft

Für mindestens einen neuen Test die Gegenprobe machen: die geprüfte Zeile im Code gedanklich (oder kurz wirklich) ändern. Bleibt der Test grün, prüft er nichts und wird geschärft.

## Abnahmekriterium

- Jede betroffene Route hat Normal-, Grenz- und Fehlerfall.
- Jeder Test prüft mehr als nur den Statuscode (Text, JSON oder gespeicherte Daten).
- `pytest -q` ist komplett grün, `data/tasks.json` ist unverändert.

## Bericht

```text
Tests für: <Route/Funktion>
Neue Tests: <Anzahl> in <Dateien>
Fälle: Normal <n> · Grenz <n> · Fehler <n>
pytest: <x passed>
Gefundene Fehler im Code: <keine | Liste mit Datei und Zeile>
```
