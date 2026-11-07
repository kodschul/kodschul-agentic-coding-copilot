## 1. Datenmodell und Logik

- [x] 1.1 `validateTask()` um `due` erweitern: leer → `null`, sonst gültiges Datum `YYYY-MM-DD`, sonst Fehlermeldung
- [x] 1.2 `isValidDate()`, `today()` und `isOverdue(task, today)` in `src/tasks.js` ergänzen
- [x] 1.3 `sortTasks()` ergänzen und in `listTasks()` verwenden
- [x] 1.4 `createTask()` und `updateTask()` speichern `due`
- [x] 1.5 `loadTasks()` setzt fehlendes `due` auf `null`; `data/tasks.json` um `due` ergänzen

## 2. Routen und Views

- [x] 2.1 Formularfeld `due` in `POST /tasks` und `POST /tasks/<id>/edit` auslesen
- [x] 2.2 Datumsfeld im Formular „Neue Aufgabe“ und auf der Seite „Aufgabe bearbeiten“
- [x] 2.3 Anzeige „fällig TT.MM.JJJJ“ und Badge „überfällig“ (rot) in der Liste
- [x] 2.4 Layout auf Handybreite prüfen (Datumsfeld untereinander)

## 3. Tests

- [x] 3.1 Unit-Tests für `isOverdue` (gestern, heute, ohne Datum, erledigt), `isValidDate`, `sortTasks`
- [x] 3.2 Routen-Tests: Anlegen mit und ohne Datum, ungültiges Datum → 400, Bearbeiten und Entfernen des Datums
- [x] 3.3 Test für Badge „überfällig“ in der Liste und Sortierung in `GET /api/tasks`
- [x] 3.4 `test/api.test.js` und `test/edit.test.js` an das neue Feld anpassen

## 4. Abschluss

- [x] 4.1 `npm test` grün
- [x] 4.2 Review durch den Agent `reviewer`, Befunde abgearbeitet
- [x] 4.3 Im Browser per Playwright-MCP geprüft: Aufgabe mit vergangenem Datum zeigt „überfällig“, Handybreite
