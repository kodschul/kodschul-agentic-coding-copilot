# Lab 4.2 – Übung: FocusList v0 → v1 mit `copilot-instructions.md`

**Ändert die FocusList-Projektbasis?** Ja — refactort v0 zu v1 anhand einer neuen `copilot-instructions.md`.

## Ausgangslage

Das lauffähige FocusList v0 aus Modul 3 sowie `v0-weaknesses.md` aus Lab 3.2.

## Prerequisites

- `v0-weaknesses.md` liegt vor und enthält mindestens die zwei "Muss"-Punkte aus Lab 3.2.

## Aufgaben

1. Erstelle `.github/copilot-instructions.md` und übersetze jeden "Muss"-Punkt aus `v0-weaknesses.md` in eine konkrete, prüfbare Regel.
2. Bitte Copilot Chat, `add-task.ts`, `list-tasks.ts` und `complete-task.ts` gemäß der neuen Instructions-Datei zu refactoren.
3. Prüfe den entstandenen Diff Zeile für Zeile gegen jede einzelne Regel aus `copilot-instructions.md`.
4. Führe alle drei Aktionen erneut über die CLI aus und bestätige, dass sie weiterhin funktionieren.

## Checkpoint

- `copilot-instructions.md` enthält mindestens zwei konkrete, aus der Schwächenliste abgeleitete Regeln.
- Der Diff aus Aufgabe 2 zeigt für mindestens eine Regel eine sichtbare, nachvollziehbare Änderung.

## Abschlusskriterien

- Alle drei Aktionen sind nach dem Refactoring weiterhin lauffähig (v1) und folgen konsistent den Regeln aus `copilot-instructions.md`.

## Fallback

Falls das Refactoring eine Regel nicht vollständig umsetzt: die betroffene Stelle manuell nachbessern und in einer kurzen Notiz festhalten, welche Regel nicht zuverlässig automatisch angewendet wurde.
