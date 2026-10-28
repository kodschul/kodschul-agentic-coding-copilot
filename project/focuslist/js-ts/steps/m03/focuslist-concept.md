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
