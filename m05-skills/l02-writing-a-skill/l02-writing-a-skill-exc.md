# Lab 5.2 – Übung: FocusList v1 → v2 mit einer eigenen Skill

**Ändert die FocusList-Projektbasis?** Ja — fügt die Skill `add-focuslist-action` hinzu und implementiert damit die vierte Aktion.

## Ausgangslage

FocusList v1 aus Modul 4 sowie `copilot-instructions.md`.

## Prerequisites

- FocusList v1 ist lauffähig und folgt den Regeln aus `copilot-instructions.md`.

## Aufgaben

1. Erstelle `.github/skills/add-focuslist-action/SKILL.md` mit den vier Schritten (Datenmodell → Logik → CLI → Test).
2. Nutze die Skill, um die Aktion "Priorität ändern" (`set-priority.ts`) zu implementieren.
3. Prüfe den entstandenen Code gegen die Regeln aus `copilot-instructions.md` (insbesondere das Fehlerbehandlungsmuster).
4. Führe die neue Aktion über die CLI aus und bestätige, dass eine bestehende Aufgabe ihre Priorität ändert.

## Checkpoint

- `SKILL.md` enthält alle vier nummerierten Schritte.
- `set-priority.ts` existiert, wirft bei ungültiger `id` eine `Error` (statt `null`), analog zu `complete-task.ts`.

## Abschlusskriterien

- Die neue Aktion ist über die CLI ausführbar und verändert `tasks.json` sichtbar — das ist FocusList v2.

## Fallback

Falls die Skill die Fehlerbehandlungsregel nicht automatisch übernimmt: den entstandenen Code manuell an das Muster aus `complete-task.ts` angleichen und in einer Notiz festhalten, dass die Skill hier ergänzt werden sollte.
