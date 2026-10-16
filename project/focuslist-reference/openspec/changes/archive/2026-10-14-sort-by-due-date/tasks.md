# Tasks

## 1. Datenmodell und Eingabe

- [x] 1.1 Optionales Feld `dueDate` in `src/models/task.ts` ergänzen
- [x] 1.2 `add-task` um ein optionales Datum mit Prüfung über `assertIsoDate` erweitern

## 2. Sortierung

- [x] 2.1 `src/actions/sort-by-due-date.ts` als reine Funktion anlegen
- [x] 2.2 `list-tasks --sort due-date` in `src/cli.ts` verdrahten

## 3. Tests

- [x] 3.1 Tests für Sortierreihenfolge, Aufgaben ohne Datum und unveränderte Eingabeliste
