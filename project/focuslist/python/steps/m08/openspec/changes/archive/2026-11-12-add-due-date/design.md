## Context

FocusList speichert Aufgaben als JSON-Liste. Die Fachlogik liegt in `focuslist/tasks.py`, Routen in `focuslist/routes.py`, die Darstellung in Jinja2-Templates mit Tailwind. Validierung (`tasks.validate()`) gibt deutsche Fehlermeldungen zurück, Formularfehler führen zu Status 400.

## Goals / Non-Goals

**Goals:**

- Optionales Fälligkeitsdatum anlegen, ändern und entfernen.
- Überfällige offene Aufgaben auf einen Blick erkennen.
- Offene Aufgaben nach Dringlichkeit sortieren.

**Non-Goals:**

- Uhrzeiten, Zeitzonen, Erinnerungen oder wiederkehrende Termine.
- Eigener Filter „überfällig“ (später möglich).

## Decisions

- **Speicherformat ISO-String statt Zeitstempel.** `"2026-11-20"` ist lesbar in `data/tasks.json` und lässt sich als Text vergleichen (`due < heute`), ohne Umrechnung.
- **Prüfung mit `date.fromisoformat()` plus Muster `^\d{4}-\d{2}-\d{2}$`.** Ungültige Tage (`2026-02-30`) und andere Schreibweisen (`20.11.2026`) werden abgelehnt. Das HTML-Feld `type="date"` sendet bereits dieses Format.
- **„Überfällig“ als Funktion `is_overdue(task, today)`.** Das heutige Datum wird übergeben statt im Code gelesen, damit Tests mit festem Datum laufen. Heute fällig ist nicht überfällig.
- **Sortierung in `list_tasks()`.** Seite und API zeigen dieselbe Reihenfolge; die Sortierung ist stabil, Aufgaben ohne Datum behalten ihre Reihenfolge.
- **Anzeigeformat per Template-Filter `de_date`.** Daten bleiben ISO, nur die Ausgabe ist deutsch.

## Risks / Trade-offs

- [Server-Datum statt Datum im Browser] → Für eine lokale App gleich; bei einem Server in anderer Zeitzone kann „heute“ um einen Tag abweichen.
- [Bestehende Einträge ohne `due`] → `list_tasks()` ergänzt `due: null` beim Laden, keine Migration nötig.
