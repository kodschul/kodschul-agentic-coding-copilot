## ADDED Requirements

### Requirement: Optionales Fälligkeitsdatum
Eine Aufgabe MUST ein optionales Fälligkeitsdatum `due` im Format `YYYY-MM-DD` haben können. Ohne Angabe MUST `due` den Wert `null` haben. Das Datum MUST beim Anlegen und Bearbeiten gesetzt, geändert und entfernt werden können.

#### Scenario: Aufgabe mit Fälligkeitsdatum anlegen
- **WHEN** das Formular „Neue Aufgabe“ mit Titel „Bericht“, Priorität „hoch“ und Datum `2026-12-24` abgeschickt wird
- **THEN** wird die Aufgabe mit `due` = `2026-12-24` gespeichert und die Liste zeigt „fällig 24.12.2026“

#### Scenario: Aufgabe ohne Fälligkeitsdatum anlegen
- **WHEN** das Formular ohne Datum abgeschickt wird
- **THEN** wird die Aufgabe mit `due` = `null` gespeichert und in der Liste steht kein Datum

#### Scenario: Ungültiges Datum
- **WHEN** als Datum `2026-02-30` oder `morgen` gesendet wird
- **THEN** antwortet der Server mit Status 400, zeigt „Bitte ein gültiges Fälligkeitsdatum wählen.“ und speichert nichts

#### Scenario: Datum beim Bearbeiten entfernen
- **WHEN** auf der Seite „Aufgabe bearbeiten“ das Datumsfeld geleert und gespeichert wird
- **THEN** hat die Aufgabe danach `due` = `null`

### Requirement: Überfällig-Markierung
Eine offene Aufgabe, deren Fälligkeitsdatum vor dem heutigen Datum liegt, MUST in der Liste mit einem roten Badge „überfällig“ markiert werden. Erledigte Aufgaben und Aufgaben ohne Datum MUST nie als überfällig gelten.

#### Scenario: Datum in der Vergangenheit
- **WHEN** heute der 12.11.2026 ist und eine offene Aufgabe `due` = `2026-11-11` hat
- **THEN** zeigt die Liste bei dieser Aufgabe das Badge „überfällig“

#### Scenario: Heute fällig
- **WHEN** heute der 12.11.2026 ist und eine offene Aufgabe `due` = `2026-11-12` hat
- **THEN** zeigt die Liste kein Badge „überfällig“

#### Scenario: Erledigte Aufgabe mit altem Datum
- **WHEN** eine erledigte Aufgabe `due` = `2020-01-01` hat
- **THEN** zeigt die Liste kein Badge „überfällig“

### Requirement: Sortierung nach Fälligkeit
Die Liste und `GET /api/tasks` MUST offene Aufgaben aufsteigend nach Fälligkeitsdatum sortieren. Offene Aufgaben ohne Datum MUST nach den offenen Aufgaben mit Datum stehen, erledigte Aufgaben MUST danach folgen.

#### Scenario: Gemischte Liste
- **WHEN** offene Aufgaben mit `due` = `null`, `2026-12-01` und `2026-11-15` sowie eine erledigte Aufgabe existieren
- **THEN** ist die Reihenfolge: `2026-11-15`, `2026-12-01`, ohne Datum, erledigte Aufgabe

### Requirement: Fälligkeitsdatum in der API
`GET /api/tasks` MUST für jede Aufgabe das Feld `due` liefern, als String `YYYY-MM-DD` oder `null`.

#### Scenario: API-Antwort
- **WHEN** `GET /api/tasks` aufgerufen wird
- **THEN** enthält jedes Objekt die Felder `id`, `title`, `priority`, `done` und `due`
