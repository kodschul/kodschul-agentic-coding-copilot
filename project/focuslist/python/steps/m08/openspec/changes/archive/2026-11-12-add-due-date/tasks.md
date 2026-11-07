## 1. Fachlogik

- [x] 1.1 `validate_due()` in `focuslist/tasks.py`: leer → `None`, gültiges ISO-Datum → Text, sonst Fehlermeldung
- [x] 1.2 `add_task()` und `update_task()` um Parameter `due` erweitern
- [x] 1.3 `is_overdue(task, today)`: offen und `due < today`
- [x] 1.4 `sort_tasks()`: offene nach `due` (ohne Datum zuletzt), danach erledigte; in `list_tasks()` verwenden

## 2. Routen und Templates

- [x] 2.1 `POST /tasks` und `POST /tasks/<id>/edit` lesen `due` über `read_form()`, Fehler → 400
- [x] 2.2 Datumsfeld im Formular „Neue Aufgabe“ (`index.html`) und auf der Bearbeiten-Seite (`edit.html`)
- [x] 2.3 Anzeige „fällig TT.MM.JJJJ“ über Filter `de_date` und rotes Badge „überfällig“
- [x] 2.4 `data/tasks.json` um `"due": null` ergänzen

## 3. Tests und Review

- [x] 3.1 Tests mit dem Agenten tester: Anlegen, Bearbeiten, ungültige Daten, Badge, Grenzfall „heute“, Sortierung, API (`tests/test_due.py`)
- [x] 3.2 Bestehende Tests an das neue Feld `due` anpassen
- [x] 3.3 Review mit dem Agenten reviewer, Befunde abgearbeitet
- [x] 3.4 `pytest` grün, Darstellung im Browser per Playwright-MCP geprüft (Handybreite)
