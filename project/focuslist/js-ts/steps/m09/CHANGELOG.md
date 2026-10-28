# Changelog

Alle Änderungen an FocusList, die für Nutzer der CLI sichtbar sind. Neue Einträge kommen unter `## [Unreleased]`, eine Zeile pro Aktion in `src/actions/`. Gepflegt mit `.github/prompts/generate-docs.prompt.md` (Modul 6).

## [Unreleased]

### Hinzugefügt

- `add-task <titel> [low|medium|high] [JJJJ-MM-TT]`: Aufgabe anlegen, Priorität Standard `medium`; Fälligkeitsdatum seit v7.
- `list-tasks [--status open|done] [--priority low|medium|high]`: Aufgaben mit id anzeigen, optional gefiltert.
- `complete-task <id>`: Aufgabe als erledigt markieren.
- `set-priority <id> <low|medium|high>`: Priorität einer Aufgabe ändern (v2, per Skill `add-focuslist-action`).
- `search-tasks <begriff>`: Aufgaben über einen Begriff im Titel finden, ohne Beachtung der Groß-/Kleinschreibung (v3, per Skill `filter-and-search-tasks`).
- `bulk-set-priority <low|medium|high> <id> …`: Priorität mehrerer Aufgaben in einem Aufruf ändern, alles oder nichts (v5, per Skill `bulk-priority-update`).
- `list-tasks --sort due-date`: Aufgaben nach Fälligkeitsdatum sortieren, Aufgaben ohne Datum zuletzt (v7, OpenSpec-Change `sort-by-due-date`).
- `complete-tasks <id> …`: mehrere Aufgaben in einem Aufruf erledigen, alles oder nichts (v7, Agenten-Kette `focuslist-feature-team`).
