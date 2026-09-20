# Lab 1.3 – Lösung

## Aufgabe 1: Beispiele je Spektrum-Stufe

Individuelle Antworten je Gruppe — typische Beispiele:

- **Autocomplete:** eine einzelne Codezeile wird beim Tippen vorgeschlagen und per Tab übernommen.
- **Chat:** eine Frage zu einer Fehlermeldung wird gestellt und die Antwort manuell umgesetzt.
- **Agentic (geführt):** ein Refactoring über mehrere Dateien hinweg, das auf einer Instructions-Datei basiert.
- **Agentic (autonom):** ein automatisierter Hook, der bei jedem Commit ohne manuellen Trigger Tests ausführt.

## Aufgaben 2–4: `focuslist-concept.md`

```markdown
# FocusList – Konzept (v0)

## Datenmodell: Task

- id: string (eindeutig, z. B. UUID oder fortlaufende Zahl)
- title: string
- done: boolean (Default: false)
- priority: "low" | "medium" | "high" (Default: "medium")

## Aktionen (v0)

1. Aufgabe anlegen (`title`, optional `priority`)
2. Aufgaben auflisten (alle, optional gefiltert nach `done`)
3. Aufgabe erledigen (per `id`, setzt `done = true`)

## Speicherung

Eine einzelne JSON-Datei (`tasks.json`) im Projektordner — kein Datenbank-Server.
```

**Begründung der Minimal-Variante:** Der Zweck dieses Labs ist eine gemeinsame, eindeutige Ausgangsbasis, nicht Vollständigkeit — jedes zusätzliche Feld würde in Modul 2/3 nur zusätzliche, für den Lernzweck irrelevante Entscheidungen erzwingen. Diese Datei wird in Modul 2 (Chat-Erklärung) und Modul 3 (v0-Implementierung) unverändert weiterverwendet.
