# FocusList (Python)

Kleine Web-App für persönliche Aufgaben: Flask 3, Jinja2-Templates, Tailwind CSS v4, Daten in `data/tasks.json`.

## Start

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env              # danach FOCUSLIST_SECRET setzen
npm install
npm run build:css
flask --app focuslist run --debug
```

Danach im Browser: <http://127.0.0.1:5000>

## Konfiguration

| Variable | Zweck |
| --- | --- |
| `FOCUSLIST_SECRET` | Schlüssel für Session-Cookies und Hinweise (`flash`). `flask run` liest ihn aus `.env` (python-dotenv). Ohne Wert gilt ein zufälliger Schlüssel pro Start. |

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
| `AGENTS.md` | Regeln für Agenten (Stack, Befehle, Konventionen, Verbote) |
| `.github/instructions/` | Regeln nur für bestimmte Dateien (`applyTo`) |
| `.github/skills/` | Skills `test-writer` und `security-checker` |
| `docs/` | Berichte (z. B. `security-report.md`) |
| `focuslist/__init__.py` | `create_app()` |
| `focuslist/routes.py` | Routen (Blueprint `tasks`) |
| `focuslist/tasks.py` | Fachlogik: filtern, anlegen, erledigen, löschen |
| `focuslist/store.py` | Laden und Speichern der JSON-Datei |
| `focuslist/templates/` | Jinja2-Templates (`base.html`, `index.html`) |
| `static/src/input.css` | Tailwind-Eingabe |
| `data/tasks.json` | Beispielaufgaben |
| `tests/` | pytest-Tests |
