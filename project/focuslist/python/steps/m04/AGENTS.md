# FocusList – Regeln für Agenten

Kleine Aufgaben-App für Aufgaben mit Priorität.

## Stack

- Flask 3 + Jinja2, Tailwind CSS v4, Daten in `data/tasks.json`, Tests mit pytest
- Routen liegen in einem Blueprint (`bp` in `routes.py`): eine Gruppe von Routen, die `create_app()` registriert

## Ordner

- `focuslist/__init__.py` – nur `create_app()`, Konfiguration, Blueprint registrieren
- `focuslist/routes.py` – Routen: Eingabe lesen, Service aufrufen, Antwort rendern
- `focuslist/tasks.py` – Fachlogik (filtern, anlegen, ändern, löschen, IDs)
- `focuslist/store.py` – nur `load_tasks()` und `save_tasks()`
- `focuslist/templates/` – Jinja2-Templates, `static/src/input.css` – Tailwind-Eingabe
- `tests/` – pytest; Fixtures `app` und `client` in `tests/conftest.py`

## Befehle

- Start: `flask --app focuslist run --debug`
- Tests: `pytest` (vor jeder Übergabe ausführen, alle grün)
- CSS: `npm run build:css` (einmal) oder `npm run css` (beobachten)

## Konventionen

- Eine Schicht pro Aufgabe: Route → `tasks.py` → `store.py`. Keine Dateizugriffe in Routen.
- Neue ID immer `max(id) + 1` über `tasks.next_id()`, nie `len(tasks) + 1`.
- Jede neue oder geänderte Route bekommt Tests (Normalfall und Fehlerfall).
- Formulare: nach POST immer Redirect (`url_for`), Hinweise per `flash()` (Meldung für die nächste Seite).
- Unbekannte ID → `abort(404)`.
- UI-Texte Deutsch, Code und Bezeichner Englisch, Kommentare kurz und Deutsch.
- Styling nur mit Tailwind-Klassen im Template, kein eigenes CSS, keine Inline-Styles.

## Verbote

- Keine neuen Abhängigkeiten (pip oder npm) ohne Rückfrage.
- `.env` nicht lesen oder ändern, keine Secrets in Code, Tests oder Chat.
- `data/tasks.json` nicht in Tests verändern, Tests arbeiten auf einer Kopie.
- Kein `git commit`, `git push` oder Löschen von Ordnern ohne Rückfrage.
