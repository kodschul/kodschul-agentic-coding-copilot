# Lab 3.1 – Übung: FocusList v0 bauen

**Ändert die FocusList-Projektbasis?** Ja — legt die erste lauffähige Version (v0) an.

## Ausgangslage

Das leere Starter-Repo für den gewählten Stack (JS/TS oder Python) sowie `focuslist-concept.md` aus Lab 1.3.

## Prerequisites

- Starter-Repo lokal geklont/kopiert und lauffähig (`npm install`/`tsx` bzw. `uv run`/`python` verfügbar).
- `focuslist-concept.md` liegt im Projektordner.

## Aufgaben

1. Bitte Copilot Chat, anhand von `focuslist-concept.md` das Datenmodell (`Task`) und eine einfache JSON-Datei-Speicherung zu implementieren — ohne weitere Vorgaben zu machen.
2. Lasse in einer separaten Anfrage die Aktion "Aufgabe anlegen" implementieren.
3. Lasse in einer weiteren separaten Anfrage die Aktion "Aufgaben auflisten" implementieren.
4. Lasse in einer letzten separaten Anfrage die Aktion "Aufgabe erledigen" implementieren.
5. Führe alle drei Aktionen nacheinander über die CLI aus und prüfe, ob sie grundsätzlich funktionieren.

## Checkpoint

- Alle drei Aktionen (anlegen, auflisten, erledigen) können tatsächlich ausgeführt werden und verändern `tasks.json` sichtbar.
- Für jede der vier Anfragen (Datenmodell + 3 Aktionen) wurde eine separate, unabhängige Chat-Anfrage gestellt (kein gemeinsamer "baue alles auf einmal"-Prompt).

## Abschlusskriterien

- FocusList v0 legt eine Aufgabe an, listet sie auf und kann sie als erledigt markieren — nachweisbar über die CLI-Ausgabe.

## Fallback

Falls eine der vier Anfragen kein lauffähiges Ergebnis liefert: die fehlende Aktion minimal von Hand ergänzen (wenige Zeilen), damit v0 für Lab 3.2 vollständig genug ist, um dort echte Schwächen analysieren zu können.
