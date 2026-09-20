# Lab 6.3 – Übung: FocusList-Dokumentation per Doku-Prompt erzeugen

**Ändert die FocusList-Projektbasis?** Ja — erzeugt/aktualisiert `README.md`, einen Changelog-Eintrag und fehlende Docstrings.

## Ausgangslage

FocusList v3 aus Lab 6.2 (vier Aktionen: anlegen, auflisten, erledigen, Priorität ändern).

## Prerequisites

- Alle vier Aktionen in `src/actions/` sind vorhanden und lauffähig.

## Aufgaben

1. Schreibe `.github/prompts/generate-docs.prompt.md`, der README-Abschnitt, Changelog-Eintrag und fehlende Docstrings aus dem aktuellen Codestand ableitet.
2. Wende den Prompt an und prüfe, ob `README.md` alle vier tatsächlich existierenden Aktionen korrekt auflistet.
3. Prüfe den generierten Changelog-Eintrag gegen die zuletzt hinzugefügte Aktion (`set-priority`) auf inhaltliche Richtigkeit.
4. Korrigiere manuell jede Abweichung, die du in Aufgabe 2 oder 3 findest.

## Checkpoint

- `README.md` listet alle vier Aktionen mit korrekter Kurzbeschreibung.
- Der Changelog-Eintrag bezieht sich konkret auf `set-priority`, nicht auf eine ältere oder erfundene Änderung.

## Abschlusskriterien

- README, Changelog und Docstrings spiegeln den tatsächlichen Stand von FocusList (v3) wider — geprüft, nicht nur generiert.

## Fallback

Falls der Prompt eine Aktion auslässt oder falsch beschreibt: das manuell ergänzen/korrigieren und in einer kurzen Notiz festhalten, welcher Teil nachgebessert werden musste.
