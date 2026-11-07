## Why

Aufgaben in FocusList haben keinen Termin. Wer viele offene Aufgaben hat, sieht nicht, was zuerst dran ist und was bereits zu spät ist. Ein optionales Fälligkeitsdatum mit sichtbarer Überfällig-Markierung und Sortierung löst das, ohne die einfache Bedienung zu verlieren.

## What Changes

- Neues optionales Feld `due` (Datum `YYYY-MM-DD` oder `null`) an jeder Aufgabe
- Formular „Neue Aufgabe“ und Seite „Aufgabe bearbeiten“ bekommen ein Datumsfeld; leer = kein Datum
- Liste zeigt das Datum als „fällig TT.MM.JJJJ“ und ein rotes Badge „überfällig“, wenn das Datum vor heute liegt und die Aufgabe offen ist
- Offene Aufgaben werden nach Fälligkeit sortiert, Aufgaben ohne Datum stehen am Ende der offenen Aufgaben, erledigte Aufgaben danach
- `GET /api/tasks` liefert `due` mit und nutzt dieselbe Sortierung
- Ungültige Daten werden abgelehnt (400, Formularfehler)

**Nicht im Umfang:** Uhrzeiten, Erinnerungen, wiederkehrende Aufgaben, Zeitzonen-Einstellungen, Filter „nur überfällige“.

## Capabilities

### New Capabilities
- `tasks`: Verwaltung von Aufgaben in FocusList, in diesem Change mit Fälligkeitsdatum, Überfällig-Markierung und Sortierung

### Modified Capabilities

## Impact

- Code: `src/tasks.js` (Validierung, `isOverdue`, `sortTasks`), `src/store.js` (fehlendes `due` als `null` lesen), `src/app.js` (Formularfeld `due`), `src/views/index.js`, `src/views/edit.js`, `src/views/parts.js`
- Daten: `data/tasks.json` bekommt das Feld `due`; bestehende Einträge ohne Feld bleiben gültig
- API: zusätzliches Feld `due` in `GET /api/tasks`, Reihenfolge ändert sich
- Tests: neue Datei `test/due.test.js`, Anpassung `test/api.test.js` und `test/edit.test.js`
- Keine neuen Abhängigkeiten
