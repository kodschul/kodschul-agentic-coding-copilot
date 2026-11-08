# FocusList (Node.js)

Kleine Aufgabenliste für den Kurs „Agentic Coding mit GitHub Copilot“.
Node.js 22+ ohne Framework, Tailwind CSS v4, Daten in `data/tasks.json`.

## Start

```bash
npm install          # nur Tailwind (devDependencies)
npm run build:css    # erzeugt static/app.css
npm run dev          # http://localhost:3000, startet bei Änderungen neu
```

## Tests

```bash
npm test             # node --test "test/**/*.test.js"
```

## CSS

- `npm run css` beobachtet Änderungen und baut `static/app.css` laufend neu.
- `npm run build:css` baut einmal und minifiziert.
- `static/app.css` ist generiert und steht in `.gitignore`.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `server.js` | Startet den Server auf `PORT` (Standard 3000) |
| `src/app.js` | `createApp()`: Routen |
| `src/store.js` | `loadTasks()`, `saveTasks()` für die JSON-Datei |
| `src/views/` | HTML als Template-Funktionen |
| `static/src/input.css` | Tailwind-Einstieg |
| `test/` | Tests mit `node:test` |
