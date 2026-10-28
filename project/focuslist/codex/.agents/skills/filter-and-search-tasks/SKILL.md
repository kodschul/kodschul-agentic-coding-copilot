---
name: filter-and-search-tasks
description: Baut Such- und Filterfunktionen für FocusList-Tasks (Volltextsuche im Titel, Filter nach Status, Priorität oder Datum). Verwenden, wenn Tasks gefunden, gefiltert oder eingegrenzt werden sollen.
---

# Suchen und Filtern in FocusList

- Suchen und Filtern **ändert nie** gespeicherte Daten: nur `readTasks()` verwenden, nie `writeTasks()`.
- Textvergleiche sind unabhängig von Groß-/Kleinschreibung (`toLowerCase()` auf beiden Seiten).
- Ein leerer Suchbegriff ist ein Fehler (`throw new Error(...)`), keine leere Trefferliste.
- Kein Treffer ergibt eine leere Liste, keinen Fehler.
- Bestehende Filter erweitern statt neue Parallelfunktionen bauen: Filter gehören in `ListFilter` in `src/actions/list-tasks.ts`, Volltextsuche in `src/actions/search-tasks.ts`.

## Tests

Pro Funktion mindestens: Treffer, kein Treffer, Groß-/Kleinschreibung, ungültige Eingabe.
