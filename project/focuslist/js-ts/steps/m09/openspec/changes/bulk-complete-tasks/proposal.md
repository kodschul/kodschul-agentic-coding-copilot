# Proposal

## Why

Nach einem Arbeitstag sind oft mehrere Aufgaben erledigt. `complete-task` einzeln pro id aufzurufen ist umständlich und fehleranfällig.

## What Changes

- Neuer Befehl `complete-tasks <id> [<id> ...]` markiert mehrere Aufgaben in einem Aufruf als erledigt.
- Unbekannte ids brechen den ganzen Aufruf ab, ohne etwas zu speichern.

## Capabilities

### New Capabilities
- `task-completion`: Aufgaben einzeln oder gesammelt als erledigt markieren.

### Modified Capabilities

## Impact

- neue Datei `src/actions/complete-tasks.ts` mit Tests
- `src/cli.ts` (neuer Unterbefehl)
