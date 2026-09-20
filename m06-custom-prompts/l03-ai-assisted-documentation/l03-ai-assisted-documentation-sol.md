# Lab 6.3 – Lösung

## Aufgabe 1: `generate-docs.prompt.md`

```markdown
---
description: Erzeugt/aktualisiert README, Changelog-Eintrag und Docstrings aus dem aktuellen Codestand.
---

Analysiere alle Dateien in `src/actions/`. Aktualisiere in `README.md`
den Abschnitt "Verfügbare Aktionen" so, dass er exakt den tatsächlich
vorhandenen Aktionen entspricht. Ergänze einen neuen Changelog-Eintrag
für die zuletzt hinzugefügte Aktion. Ergänze fehlende Docstrings an
öffentlichen Funktionen, ohne bestehende Kommentare zu entfernen.
```

## Aufgabe 2: README-Ausschnitt (nach Anwendung)

```markdown
## Verfügbare Aktionen

- `add-task`: legt eine neue Aufgabe an.
- `list-tasks`: listet alle Aufgaben auf.
- `complete-task`: markiert eine Aufgabe als erledigt.
- `set-priority`: ändert die Priorität einer bestehenden Aufgabe.
```

## Aufgabe 3: Changelog-Eintrag

```markdown
## [v2] – Priorität ändern

- Neue Aktion `set-priority` ergänzt (per Skill `add-focuslist-action`).
```

## Aufgabe 4: Typische Korrektur

Häufige Abweichung: der generierte Changelog-Eintrag benennt eine falsche Versionsnummer oder verwechselt v2/v3 — das wird manuell auf den tatsächlichen Stand (v3, nach Prompt-Bibliothek aus Lab 6.2) korrigiert.
