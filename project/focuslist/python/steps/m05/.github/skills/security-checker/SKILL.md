---
name: security-checker
description: Prüft FocusList auf typische Sicherheitslücken in Web-Apps (XSS, fehlende Validierung, Secrets im Code, Debug-Modus, Pfade aus Nutzereingaben, Abhängigkeiten, CSRF) anhand einer Checkliste und liefert einen Bericht. Ändert keinen Code. Verwenden für Sicherheits-Reviews, vor einem Merge oder wenn nach Sicherheitsproblemen gefragt wird.
argument-hint: "[Datei, Ordner oder leer für das ganze Projekt]"
---

# Skill: security-checker

Findet Sicherheitsprobleme und berichtet sie. **Ändert keine Datei.** Reparieren ist ein eigener, späterer Schritt, den ein Mensch freigibt.

## Wann einsetzen

- Vor einem Merge oder Commit mit neuen Routen, Formularen oder Templates.
- Wenn nach Sicherheit, XSS, Validierung oder Secrets gefragt wird.
- Als Teil eines Reviews.

## Schritte

1. **Umfang klären.** Ohne Argument: `focuslist/`, `tests/`, Projektdateien im Wurzelordner (`pyproject.toml`, `requirements.txt`, `package.json`, `.gitignore`). Mit Argument: nur diese Datei oder dieser Ordner.
2. **Checkliste abarbeiten.** Jeden Punkt aus [checklist.md](./checklist.md) prüfen. Für jeden Punkt konkret im Code nachsehen (suchen, Datei lesen), nicht aus dem Gedächtnis urteilen.
3. **Befunde belegen.** Für jeden Befund: Datei und Zeile, kurzes Zitat der Stelle, warum es ein Problem ist, wie ein Angriff aussehen würde (ein Satz).
4. **Schwere festlegen.**
   - **hoch:** direkt ausnutzbar (XSS, Secret im Code, Debug-Modus erreichbar)
   - **mittel:** ausnutzbar unter Bedingungen oder Datenmüll möglich (fehlende Validierung, fehlender CSRF-Schutz)
   - **niedrig:** Härtung, gute Praxis (Abhängigkeiten nicht geprüft, fehlende Tests für Sicherheitsregeln)
5. **Bericht ausgeben** (Format unten). Keine Datei ändern, keine Befehle ausführen, die etwas verändern.

## Was der Skill nicht tut

- Keine Änderungen am Code, auch keine „kleinen“ Reparaturen nebenbei.
- Keine Werkzeuge installieren. `pip-audit` oder `npm audit` nur empfehlen.
- Keine Secrets ausgeben: Fundstellen nur mit Datei und Zeile nennen, den Wert maskieren.

## Bericht

```markdown
# Sicherheitsbericht FocusList

Geprüft: <Umfang> · Checkliste: security-checker/checklist.md

| Befund | Datei | Schwere | Status |
| --- | --- | --- | --- |
| <kurz, was und warum> | `<datei>:<zeile>` | hoch / mittel / niedrig | offen |

**Ohne Befund:** <Checklistenpunkte, die geprüft und in Ordnung sind>

**Empfehlung zur Reihenfolge:** <erst hoch, dann mittel; je ein Satz>
```

Status ist im ersten Bericht immer `offen`. Nach der Reparatur wird der Bericht aktualisiert (`behoben` mit Verweis auf den Test, der den Fund absichert).
