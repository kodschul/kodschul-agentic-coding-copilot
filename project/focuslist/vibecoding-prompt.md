# Vibecoding-Prompt: FocusList v0

One-Shot-Prompt für Lab 3.2. Gilt für beide Stacks (Python und Node.js), Startpunkt ist das Startgerüst `start/` bzw. der eigene Stand nach Lab 2.5.

So geht es: neue Chat-Sitzung im Copilot-Harness, Agent **Agent**, Autopilot aus. Den Prompt unten unverändert kopieren und senden, ohne Kontext anzuhängen.

## Der Prompt

```text
Mach aus FocusList eine richtige kleine Aufgaben-App. Bau bitte alles auf einmal ein:

1. Über der Liste ein Formular "Neue Aufgabe": Textfeld für den Titel, Auswahl für die Priorität (niedrig, mittel, hoch) und ein Button "Hinzufügen". Die neue Aufgabe wird gespeichert und erscheint sofort in der Liste.
2. Nach dem Anlegen oben ein grüner Hinweis: Aufgabe „<Titel>“ angelegt.
3. Die Priorität als farbiges Badge neben dem Titel: hoch rot, mittel gelb, niedrig grau.
4. Bei jeder offenen Aufgabe ein Button "Erledigt". Erledigte Aufgaben werden durchgestrichen angezeigt.
5. Über der Liste ein Filter mit den Links Alle, Offen und Erledigt.
6. Eine JSON-API unter /api/tasks, die alle Aufgaben als JSON liefert und mit ?status=open, ?status=done und ?status=all filtert.

Style alles mit Tailwind, modern und aufgeräumt.

Fertig ist es, wenn ich im Browser eine Aufgabe anlegen, als erledigt markieren und filtern kann und /api/tasks JSON liefert. Sag mir am Ende, wie ich die App starte.
```

## Aufbau

| Teil | Im Prompt |
| --- | --- |
| Ziel | „eine richtige kleine Aufgaben-App“, alles auf einmal |
| Funktionen | sechs nummerierte Punkte, jeder im Browser sichtbar |
| Stack | nur „Tailwind“; Sprache und Framework übernimmt der Agent aus dem Projekt |
| Fertig, wenn | Anlegen, Erledigen, Filtern im Browser und JSON unter `/api/tasks` |

## Was bewusst fehlt

So schreibt ein typischer Vibecoding-Prompt: Er beschreibt, was man sehen will, nicht, wie es gebaut werden soll. Es fehlen absichtlich:

- Projektstruktur (wo Routen, Logik und Speichern hingehören),
- Regeln für IDs, leere oder zu lange Titel und unbekannte Prioritäten,
- Tests,
- Sicherheitsregeln (Ausgabe escapen, Eingaben prüfen),
- Verbote (keine neuen Pakete, Startbefehl beibehalten).

Was der Agent an diesen Stellen selbst entscheidet, wird in Lab 3.3 bewertet. Beispielergebnis: `python/steps/m03/` und `node/steps/m03/`.
