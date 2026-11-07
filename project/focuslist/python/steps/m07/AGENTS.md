# FocusList – Regeln für Agenten

Kleine Aufgaben-App: Flask 3 + Jinja2, Tailwind CSS v4, Daten in `data/tasks.json`, Tests mit pytest.

## Ordner

- `focuslist/__init__.py` – nur `create_app()`, Konfiguration, Blueprint registrieren
- `focuslist/routes.py` – Routen: Eingabe lesen, Service aufrufen, Antwort rendern
- `focuslist/tasks.py` – Fachlogik (prüfen, filtern, anlegen, bearbeiten, löschen, IDs)
- `focuslist/store.py` – nur `load_tasks()` und `save_tasks()`
- `focuslist/templates/` – Jinja2-Templates, `static/src/input.css` – Tailwind-Eingabe
- `tests/` – pytest; Fixtures `app` und `client` in `tests/conftest.py`
- `.github/agents/` – Rollen `reviewer` (nur lesen), `tester` (nur `tests/`), `feature-lead`
- `.github/hooks/` – `guard` sperrt `.env` und `rm -rf`, `checks` führt nach jeder Runde `pytest` aus

## Befehle

- Start: `flask --app focuslist run --debug`
- Tests: `pytest` (vor jeder Übergabe ausführen, alle grün)
- CSS: `npm run build:css` (einmal) oder `npm run css` (beobachten)

## Konventionen

- Eine Schicht pro Aufgabe: Route → `tasks.py` → `store.py`. Keine Dateizugriffe in Routen.
- Neue ID immer `max(id) + 1` über `tasks.next_id()`, nie `len(tasks) + 1`.
- Eingaben immer im Server prüfen (`tasks.validate()`), Fehler im Formular mit Status 400.
- Jede neue oder geänderte Route bekommt Tests (Normalfall und Fehlerfall).
- Formulare: nach POST immer Redirect (`url_for`), Hinweise per `flash()`.
- Unbekannte ID → `abort(404)`.
- UI-Texte Deutsch, Code und Bezeichner Englisch, Kommentare kurz und Deutsch.
- Styling nur mit Tailwind-Klassen im Template, mobil zuerst (`w-full`, ab `sm:` nebeneinander).

## Verbote

- Keine neuen Abhängigkeiten (pip oder npm) ohne Rückfrage.
- `.env` nicht lesen oder ändern, keine Secrets in Code, Tests oder Chat; Secrets nur über Umgebung (`.env.example`).
- Kein `debug=True` im Code.
- `data/tasks.json` nicht in Tests verändern, Tests arbeiten auf einer Kopie.
- Kein `git commit`, `git push` oder Löschen von Ordnern ohne Rückfrage.
