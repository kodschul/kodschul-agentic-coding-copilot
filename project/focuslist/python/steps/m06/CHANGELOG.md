# Changelog

Alle Änderungen an FocusList, die für Nutzer der CLI sichtbar sind. Neue Einträge kommen unter `## [Unreleased]`, eine Zeile pro Aktion in `focuslist/actions/`. Gepflegt mit `.github/prompts/generate-docs.prompt.md` (Modul 6).

## [Unreleased]

### Hinzugefügt

- `add-task <titel> [low|medium|high]`: Aufgabe anlegen, Priorität Standard `medium`.
- `list-tasks [--status open|done] [--priority low|medium|high]`: Aufgaben mit id anzeigen, optional gefiltert.
- `complete-task <id>`: Aufgabe als erledigt markieren.
- `set-priority <id> <low|medium|high>`: Priorität einer Aufgabe ändern (v2, per Skill `add-focuslist-action`).
- `search-tasks <begriff>`: Aufgaben über einen Begriff im Titel finden, ohne Beachtung der Groß-/Kleinschreibung (v3, per Skill `filter-and-search-tasks`).
