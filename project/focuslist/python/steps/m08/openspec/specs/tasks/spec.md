# tasks Specification

## Purpose
Verhalten der Aufgabenliste von FocusList. Entstanden durch Archivieren des Changes `add-due-date` (2026-11-12); weitere Anforderungen kommen mit künftigen Changes hinzu.

## Requirements

### Requirement: Optionales Fälligkeitsdatum
Das System SHALL für jede Aufgabe ein optionales Fälligkeitsdatum im Format JJJJ-MM-TT speichern. Ein leeres Feld bedeutet „kein Datum“.

#### Scenario: Aufgabe mit Datum anlegen
- **WHEN** eine Aufgabe mit Titel „Abgabe“ und Fälligkeit 2026-11-20 angelegt wird
- **THEN** wird die Aufgabe mit `due` = "2026-11-20" gespeichert
- **AND** die Liste zeigt „fällig 20.11.2026“

#### Scenario: Aufgabe ohne Datum anlegen
- **WHEN** eine Aufgabe mit leerem Datumsfeld angelegt wird
- **THEN** wird die Aufgabe mit `due` = null gespeichert

#### Scenario: Ungültiges Datum
- **WHEN** als Fälligkeit „2026-02-30“ oder „20.11.2026“ gesendet wird
- **THEN** antwortet das System mit Status 400 und der Meldung zum Fälligkeitsdatum
- **AND** es wird keine Aufgabe gespeichert

#### Scenario: Datum bearbeiten und entfernen
- **WHEN** auf der Seite „Aufgabe bearbeiten“ ein Datum gesetzt und später das Feld geleert wird
- **THEN** ist `due` zuerst das gesetzte Datum und danach null

### Requirement: Markierung überfällig
Das System SHALL offene Aufgaben, deren Fälligkeitsdatum vor dem heutigen Datum liegt, mit einem roten Badge „überfällig“ markieren.

#### Scenario: Gestern fällig und offen
- **WHEN** eine offene Aufgabe das Fälligkeitsdatum von gestern hat
- **THEN** zeigt die Liste das Badge „überfällig“

#### Scenario: Heute fällig
- **WHEN** eine offene Aufgabe das heutige Datum als Fälligkeit hat
- **THEN** zeigt die Liste kein Badge „überfällig“

#### Scenario: Erledigte Aufgabe mit altem Datum
- **WHEN** eine erledigte Aufgabe ein Fälligkeitsdatum in der Vergangenheit hat
- **THEN** zeigt die Liste kein Badge „überfällig“

### Requirement: Sortierung nach Fälligkeit
Das System SHALL offene Aufgaben nach Fälligkeitsdatum aufsteigend sortieren, Aufgaben ohne Datum nach denen mit Datum und erledigte Aufgaben am Ende anzeigen. Liste und `GET /api/tasks` verwenden dieselbe Reihenfolge.

#### Scenario: Gemischte Liste
- **WHEN** offene Aufgaben mit Fälligkeit 2026-12-01, 2026-11-15 und ohne Datum sowie eine erledigte Aufgabe existieren
- **THEN** ist die Reihenfolge 2026-11-15, 2026-12-01, ohne Datum, erledigt

#### Scenario: API liefert Fälligkeit
- **WHEN** `GET /api/tasks` aufgerufen wird
- **THEN** enthält jede Aufgabe das Feld `due` (Datum oder null) in der sortierten Reihenfolge
