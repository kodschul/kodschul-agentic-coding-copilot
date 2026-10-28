---
name: bulk-priority-update
description: Ändert Felder mehrerer FocusList-Tasks in einem Aufruf (z. B. Priorität oder Status für eine Liste von ids). Verwenden für Massenänderungen, Batch-Operationen oder Befehle mit mehreren ids.
---

# Massenänderungen an Tasks

Massenänderungen arbeiten **alles-oder-nichts**:

1. Alle Eingaben prüfen (z. B. Priorität über `assertPriority`), leere id-Liste ist ein Fehler.
2. Alle Ziel-Tasks über ihre id suchen. Fehlt eine id: `Error` werfen, **bevor** etwas gespeichert wird.
3. Erst danach alle Ziel-Tasks ändern und einmal `writeTasks(tasks)` aufrufen.
4. Die geänderten Tasks zurückgeben.

Vorbild: `src/actions/bulk-set-priority.ts`.

## Pflicht-Tests

- Mehrere Tasks werden geändert.
- Eine unbekannte id bricht ab und **nichts** ist gespeichert (Zustand vorher = nachher).
- Leere id-Liste wirft einen Fehler.
