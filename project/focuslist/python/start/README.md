# FocusList (Python)

Kleine Web-App für persönliche Aufgaben: Flask 3, Jinja2-Templates, Tailwind CSS v4, Daten in `data/tasks.json`.

## Start

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
npm install
npm run build:css
flask --app focuslist run --debug
```

Danach im Browser: <http://127.0.0.1:5000>

## Test

```bash
pytest
```

## CSS

- `npm run build:css` baut `static/app.css` einmal (minifiziert).
- `npm run css` beobachtet die Templates und baut bei jeder Änderung neu (eigenes Terminal).
- `static/app.css` ist ein Build-Ergebnis und steht in `.gitignore`.

## Ordner

| Pfad | Inhalt |
| --- | --- |
| `focuslist/__init__.py` | `create_app()` und Routen |
| `focuslist/store.py` | Laden und Speichern der JSON-Datei |
| `focuslist/templates/` | Jinja2-Templates (`base.html`, `index.html`) |
| `static/src/input.css` | Tailwind-Eingabe |
| `data/tasks.json` | Beispielaufgaben |
| `tests/` | pytest-Tests |
