---
name: filter-and-search-tasks
description: Baut Such- und Filterfunktionen für FocusList-Tasks (Volltextsuche im Titel, Filter nach Status, Priorität oder Datum). Verwenden, wenn Tasks gefunden, gefiltert oder eingegrenzt werden sollen.
---

# Suchen und Filtern in FocusList

- Suchen und Filtern **ändert nie** gespeicherte Daten: nur `read_tasks()` verwenden, nie `write_tasks()`.
- Textvergleiche sind unabhängig von Groß-/Kleinschreibung (`.lower()` auf beiden Seiten).
- Ein leerer Suchbegriff ist ein Fehler (`raise ValueError(...)`), keine leere Trefferliste.
- Kein Treffer ergibt eine leere Liste, keinen Fehler.
- Bestehende Filter erweitern statt neue Parallelfunktionen bauen: Filter gehören in die Parameter von `list_tasks` in `focuslist/actions/list_tasks.py`, Volltextsuche in `focuslist/actions/search_tasks.py`.

## Tests

Pro Funktion mindestens: Treffer, kein Treffer, Groß-/Kleinschreibung, ungültige Eingabe.
