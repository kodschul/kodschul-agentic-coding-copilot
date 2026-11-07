# FocusList – Regeln für Agenten

Kleine Aufgabenliste (Web-App). Kursprojekt, Code soll für Einsteiger lesbar bleiben.

## Stack
- Node.js 22+, ES-Module (`import`), nur eingebaute Module (`node:http`, `node:fs/promises`, `node:path`, `node:url`, `node:test`)
- HTML aus Template-Funktionen in `src/views/`, Styling mit Tailwind CSS v4
- Daten in `data/tasks.json`, Task = `{ id, title, priority, done }`, priority = `low` | `medium` | `high`

## Ordner
- `src/app.js` – nur Routing: Request lesen, Service aufrufen, Antwort senden
- `src/tasks.js` – Aufgabenlogik (filtern, anlegen, erledigen, löschen)
- `src/store.js` – nur Lesen und Schreiben der JSON-Datei
- `src/http.js` – Helfer für Body, HTML, JSON, Redirect
- `src/views/` – HTML-Template-Funktionen, keine Logik außer Darstellung
- `test/` – Tests mit `node:test`, Helfer in `test/helpers.js`

## Befehle
- Start: `npm run dev` (http://localhost:3000)
- Tests: `npm test` (führt `test/**/*.test.js` aus)
- CSS: `npm run css` (beobachten) bzw. `npm run build:css` (einmal bauen)

## Konventionen
- Nur `async/await`, keine Callbacks
- Neue ID = größte vorhandene ID + 1 (`nextId()`)
- Formulare senden POST und leiten danach auf `/` um
- UI-Texte auf Deutsch, Code-Bezeichner auf Englisch, Kommentare kurz und deutsch
- Jede neue Route bekommt Tests (Normalfall und Fehlerfall)
- Nach jeder Änderung `npm test` ausführen, erst bei Grün fertig melden

## Sicherheit
- Jede Ausgabe von Nutzerdaten in Views durch `escapeHtml()` (`src/views/escape.js`)
- Eingaben in `src/tasks.js` prüfen (`validateTask()`), ungültig → 400, nichts speichern
- Dateipfade nie direkt aus der URL bilden, nur über `safePath()`; Body-Limit 10 KB (413)

## Verbote
- Keine npm-Pakete für die Laufzeit (kein Express, kein Template-Framework)
- `static/app.css` und `node_modules/` nicht bearbeiten oder einchecken
- `data/tasks.json` nicht in Tests verändern, Tests arbeiten mit einer Kopie
- Keine Befehle ausführen, die Dateien außerhalb des Projekts ändern
