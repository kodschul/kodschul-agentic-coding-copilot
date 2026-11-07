# Beispiel-Review: Feature „Aufgabe bearbeiten“ (Node.js)

Bericht des Agents `reviewer`, gestartet als Subagent von `feature-lead` nach dem ersten Entwurf des Features. Zeilenangaben beziehen sich auf diesen Entwurf.

## Review: Aufgabe bearbeiten (`src/app.js`, `src/tasks.js`, `src/views/edit.js`, `test/edit.test.js`)

| Befund | Datei | Schwere | Vorschlag |
| --- | --- | --- | --- |
| Eingegebener Titel wird im Fehlerfall roh in `value="${form.title}"` ausgegeben (XSS über das Bearbeiten-Formular, Verstoß gegen `templates.instructions.md`) | `src/views/edit.js:14` | hoch | `escapeHtml(form.title)` verwenden, Test mit `<b>x</b>` als Titel ergänzen |
| `POST /tasks/999/edit` leitet mit 302 auf `/` um, obwohl die Aufgabe nicht existiert; kein Test dafür | `src/app.js:58` | hoch | Vor dem Speichern `getTask()` prüfen, sonst 404; Test für GET und POST mit unbekannter ID |
| Kein Test, dass beim Bearbeiten der Status `done` erhalten bleibt | `test/edit.test.js` | mittel | Test: erledigte Aufgabe bearbeiten, danach `done === true` |
| Grenzfall Titel mit genau 100 Zeichen fehlt | `test/edit.test.js` | mittel | Test analog zu `security.test.js` für die Edit-Route |
| `priorityOptions()` und `errorList()` sind aus `index.js` nach `edit.js` kopiert | `src/views/edit.js:5-20` | mittel | Gemeinsame Bausteine nach `src/views/parts.js` verschieben und in beiden Views importieren |
| Eingabefelder ohne Beschriftung, nur Platzhalter | `src/views/edit.js:13` | niedrig | `<label>` mit sichtbarem Text „Titel“ bzw. „Priorität“ |

**Ergebnis:** nicht freigegeben

## Zweite Runde nach Abarbeitung durch `feature-lead`

Keine Befunde.

**Ergebnis:** freigegeben

`npm test`: 32 Tests, alle grün (neu: `test/edit.test.js` mit 9 Tests).
