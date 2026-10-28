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

- `focuslist/models.py` (optionales Feld `due_date`), `focuslist/actions/add_task.py`, `focuslist/cli.py`
- neue Datei `focuslist/actions/sort_by_due_date.py` mit Tests
