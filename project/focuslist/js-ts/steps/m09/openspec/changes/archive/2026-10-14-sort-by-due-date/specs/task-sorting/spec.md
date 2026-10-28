# Spec Delta

## Purpose

Aufgaben lassen sich nach Fälligkeitsdatum geordnet anzeigen, damit dringende Termine zuerst erscheinen.

## ADDED Requirements

### Requirement: Sortierung nach Fälligkeitsdatum
Das System SHALL bei `list-tasks --sort due-date` Aufgaben mit Fälligkeitsdatum aufsteigend nach Datum ausgeben.

#### Scenario: Zwei Aufgaben mit Datum
- **WHEN** Aufgaben mit den Daten 2026-12-01 und 2026-11-01 existieren
- **THEN** erscheint die Aufgabe vom 2026-11-01 zuerst

### Requirement: Aufgaben ohne Datum am Ende
Das System SHALL Aufgaben ohne Fälligkeitsdatum nach allen Aufgaben mit Datum ausgeben.

#### Scenario: Gemischte Liste
- **WHEN** eine Aufgabe ohne Datum vor einer Aufgabe mit Datum angelegt wurde
- **THEN** steht die Aufgabe ohne Datum in der sortierten Ausgabe am Ende

### Requirement: Gespeicherte Daten bleiben unverändert
Das System MUST beim Sortieren nur die Ausgabe ordnen und die gespeicherte Reihenfolge nicht ändern.

#### Scenario: Sortieren und danach normal auflisten
- **WHEN** zuerst `list-tasks --sort due-date` und danach `list-tasks` ausgeführt wird
- **THEN** zeigt `list-tasks` wieder die Anlagereihenfolge
