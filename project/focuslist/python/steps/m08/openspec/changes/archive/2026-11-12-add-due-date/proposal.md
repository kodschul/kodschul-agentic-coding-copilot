## Why

Aufgaben in FocusList haben keinen Termin. Wer viele offene Aufgaben hat, sieht nicht, was zuerst dran ist und was schon zu spät ist. Ein optionales Fälligkeitsdatum mit Markierung „überfällig“ macht die Liste zu einer Arbeitsreihenfolge.

## What Changes

- Neues optionales Feld `due` (ISO-Datum `JJJJ-MM-TT` oder `null`) für jede Aufgabe.
- Formular „Neue Aufgabe“ und Seite „Aufgabe bearbeiten“ bekommen ein Datumsfeld; leer bedeutet „kein Datum“.
- Die Liste zeigt das Datum deutsch formatiert („fällig 20.11.2026“) und ein rotes Badge „überfällig“, wenn das Datum vor heute liegt und die Aufgabe offen ist.
- Offene Aufgaben werden nach Fälligkeit sortiert, Aufgaben ohne Datum zuletzt, erledigte am Ende.
- `GET /api/tasks` liefert `due` mit, in derselben Reihenfolge wie die Liste.

## Capabilities

### New Capabilities

- `tasks`: Anforderungen an Fälligkeitsdatum, Überfällig-Markierung und Sortierung der Aufgabenliste.

### Modified Capabilities

- keine

## Impact

- Routen: `GET /`, `POST /tasks`, `GET+POST /tasks/<id>/edit`, `GET /api/tasks`
- Code: `focuslist/tasks.py` (`validate_due`, `is_overdue`, `sort_tasks`), `focuslist/routes.py`
- Templates: `index.html`, `edit.html`
- Daten: `data/tasks.json` bekommt `"due": null`; ältere Einträge ohne Feld gelten als „kein Datum“.
- Keine neuen Abhängigkeiten.
