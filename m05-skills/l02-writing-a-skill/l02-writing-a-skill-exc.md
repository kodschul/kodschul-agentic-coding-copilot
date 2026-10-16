# Lab 5.2 – Übung: FocusList v1 → v2 mit einer eigenen Skill

**Dauer:** ca. 45 Minuten
**Ändert die FocusList-Projektbasis?** Ja: neue Skill `add-focuslist-action` und neue Aktion "Priorität ändern" (v2).

## Vorbereitung

- Eigener FocusList-Ordner auf Stand v1 (Modul 4), mit `.github/copilot-instructions.md`.
- Falls v1 fehlt: Code und `copilot-instructions.md` aus [`focuslist-reference`](../../project/focuslist-reference/) bzw. [`focuslist-reference-python`](../../project/focuslist-reference-python/) übernehmen, ohne `.github/skills/` und ohne `set-priority`.
- Agent-Modus in Copilot Chat ist ausgewählt.

## Aufgaben

1. Lege `.github/skills/add-focuslist-action/` an und schreibe darin eine `SKILL.md` mit `name`, `description` und fünf nummerierten Schritten (Modell, Aktion, CLI, Test, Prüfen).
2. Lege im selben Ordner eine Vorlagendatei für eine Aktion an (`action-template.ts` bzw. `action_template.py`) und verlinke sie aus Schritt 2 der Skill.
3. Tippe `/skills` in den Chat und prüfe, ob `add-focuslist-action` in der Liste erscheint. Falls nicht: `name` und Ordnernamen vergleichen.
4. Schreibe im Agent-Modus, ohne die Skill zu nennen: "Baue eine Aktion, mit der sich die Priorität einer Aufgabe ändern lässt." Prüfe in den Tool-Aufrufen der Antwort, ob `SKILL.md` gelesen wurde.
5. Prüfe das Ergebnis gegen die fünf Schritte der Skill: Gibt es einen Test? Einen CLI-Eintrag? Wird eine ungültige Priorität abgelehnt?
6. Führe die Aktion über die CLI aus: eine Aufgabe anlegen, ihre id aus `list-tasks` kopieren, Priorität auf `high` setzen, danach mit einer erfundenen id erneut aufrufen.

## Checkpoint

- `/skills` listet `add-focuslist-action`.
- `set-priority` mit gültiger id zeigt die Aufgabe mit `(high)`.
- `set-priority` mit unbekannter id beendet sich mit `Fehler: Task mit id "…" existiert nicht.`
- Lint und Tests laufen grün.

## Abschlusskriterien

- `.github/skills/add-focuslist-action/` enthält `SKILL.md` und die Vorlage.
- Die neue Aktion, ihr CLI-Eintrag und ihr Test existieren. FocusList ist auf Stand v2.

## Erweiterung

Schreibe eine schwache `description` ("Hilft bei FocusList."), starte einen neuen Chat und wiederhole Aufgabe 4 mit einer zweiten Aktion ("Aufgabe umbenennen"). Vergleiche, ob die Skill noch geladen wird, und stelle die gute Beschreibung danach wieder her.

## Fallback

Lädt Copilot die Skill nicht automatisch: Rufe sie direkt mit `/add-focuslist-action Priorität ändern` auf. Damit ist der Ablauf testbar, die automatische Auswahl über die `description` aber nicht.
