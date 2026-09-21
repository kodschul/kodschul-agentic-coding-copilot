# Spec: sort-by-due-date

## Anforderungen

- Aufgaben mit `dueDate` werden aufsteigend danach sortiert.
- Aufgaben ohne `dueDate` erscheinen am Ende der Liste, unabhängig von
  ihrer sonstigen Reihenfolge.
- Die Sortierung ändert keine gespeicherten Daten, nur die Ausgabe.

## Status

Implementiert (`src/actions/sort-by-due-date.ts`) und archiviert — FocusList erreicht damit v7.
