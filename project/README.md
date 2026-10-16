# Projektdateien

Alle Dateien, die die Übungen brauchen. Jede Stack-Variante liegt doppelt vor: JS/TS und Python. Pro Kursdurchführung gilt ein Stack für alle.

| Ordner | Inhalt | Genutzt in |
| --- | --- | --- |
| `snippets/` | drei KI-generierte Snippets mit versteckten Schwächen | Lab 1.1 |
| `sample-project/`, `sample-project-python/` | Fremdprojekt (Ticket-Modell) für alle generischen Übungen | Lab 2.1, 2.2, 4.1, 6.1, 7.1, 8.1, 8.2 |
| `focuslist-starter/js-ts/`, `focuslist-starter/python/` | leeres FocusList-Repo | ab Lab 3.1 |
| `focuslist-tickets/` | externe Ticket-Ablage für den MCP-Server | Lab 8.3, 8.4, Modul 9 |
| `focuslist-reference/`, `focuslist-reference-python/` | fertiger Stand v7 mit allen `.github`-Artefakten | Vergleich und Rettungsanker |

## Ordner nebeneinander anlegen

Der MCP-Server erwartet die Tickets neben dem eigenen FocusList-Ordner:

```text
arbeitsordner/
├── focuslist/            # Kopie von focuslist-starter/<stack>/
└── focuslist-tickets/    # Kopie von focuslist-tickets/
```

## Versionsstufen von FocusList

| Stufe | Entsteht in | Neu |
| --- | --- | --- |
| v0 | Lab 3.1 | anlegen, auflisten, erledigen, ohne Vorgaben gebaut |
| v1 | Modul 4 | `copilot-instructions.md`, Code an Regeln angepasst |
| v2 | Lab 5.2 | Skill `add-focuslist-action`, Aktion `set-priority` |
| v3 | Modul 6 | Prompt-Dateien, README per Prompt, Transfer: Suche |
| v4 | Lab 7.2 | Test-Agent und vollständige Tests |
| v5 | Lab 8.1, 8.2 | Task "Lint + Test", Stop-Hook, Transfer: Massenänderung |
| v6 | Lab 8.4 | Ticket-Zugriff über MCP |
| v7 | Modul 9 | OpenSpec, Sortierung nach Datum, Agenten-Kette für `complete-tasks` |
