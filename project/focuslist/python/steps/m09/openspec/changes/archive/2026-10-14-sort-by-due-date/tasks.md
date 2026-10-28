# Tasks

## 1. Datenmodell und Eingabe

- [x] 1.1 Optionales Feld `due_date` in `focuslist/models.py` ergänzen
- [x] 1.2 `add-task` um ein optionales Datum mit Prüfung über `assert_iso_date` erweitern

## 2. Sortierung

- [x] 2.1 `focuslist/actions/sort_by_due_date.py` als reine Funktion anlegen
- [x] 2.2 `list-tasks --sort due-date` in `focuslist/cli.py` verdrahten

## 3. Tests

- [x] 3.1 Tests für Sortierreihenfolge, Aufgaben ohne Datum und unveränderte Eingabeliste
