# Proposal

## Why

`list-tasks` zeigt Aufgaben in Anlagereihenfolge. Wer viele Aufgaben hat, sieht dringende Termine nicht auf einen Blick.

## What Changes

- `add-task` nimmt optional ein Fälligkeitsdatum (`JJJJ-MM-TT`) entgegen.
- `list-tasks --sort due-date` gibt Aufgaben nach Fälligkeit sortiert aus.

## Capabilities

### New Capabilities
- `task-sorting`: Sortierte Ausgabe der Aufgabenliste nach Fälligkeitsdatum.

### Modified Capabilities

## Impact

- `src/models/task.ts` (optionales Feld `dueDate`), `src/actions/add-task.ts`, `src/cli.ts`
- neue Datei `src/actions/sort-by-due-date.ts` mit Tests
