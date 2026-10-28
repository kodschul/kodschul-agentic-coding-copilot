# Spec Delta

## Purpose

Erledigte Aufgaben lassen sich gesammelt abschließen, ohne jede id einzeln aufzurufen.

## ADDED Requirements

### Requirement: Mehrere Aufgaben abschließen
Das System SHALL bei `complete-tasks` mit mehreren ids alle genannten Aufgaben als erledigt speichern.

#### Scenario: Zwei bekannte ids
- **WHEN** `complete-tasks a1 b2` für zwei offene Aufgaben ausgeführt wird
- **THEN** sind beide Aufgaben als erledigt gespeichert

### Requirement: Alles-oder-nichts bei unbekannten ids
Das System MUST den Aufruf abbrechen und nichts speichern, wenn eine der ids nicht existiert.

#### Scenario: Eine id unbekannt
- **WHEN** `complete-tasks a1 unbekannt` ausgeführt wird
- **THEN** meldet das System einen Fehler und Aufgabe a1 bleibt offen

### Requirement: Mindestens eine id
Das System MUST einen Aufruf ohne ids mit einem Fehler ablehnen.

#### Scenario: Keine id angegeben
- **WHEN** `complete-tasks` ohne Argumente ausgeführt wird
- **THEN** meldet das System "Mindestens eine id angeben."
