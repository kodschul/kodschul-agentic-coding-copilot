# Cheatsheet Modul 5: Skills

Themen: [Was ist eine Skill?](./01-was-ist-ein-skill.md) · [Eine eigene Skill schreiben](./02-skill-schreiben.md) · fertige Skill: [JS/TS](../project/focuslist/js-ts/steps/m05/.github/skills/add-focuslist-action/SKILL.md), [Python](../project/focuslist/python/steps/m05/.github/skills/add-focuslist-action/SKILL.md)

## Wann Skill, wann Instructions?

| Situation | Werkzeug |
| --- | --- |
| Regel, die immer gilt ("Fehler als `Error` werfen") | `.github/copilot-instructions.md` (Modul 4) |
| Regel nur für bestimmte Pfade (Tests) | `.github/instructions/*.instructions.md` mit `applyTo` (Modul 4) |
| wiederkehrende Aufgabe mit mehreren Schritten in fester Reihenfolge | Skill |
| Einmalaufgabe | keine Datei, direkt im Chat |

## Aufbau

| Element | Regel |
| --- | --- |
| Ort im Projekt | `.github/skills/<name>/SKILL.md` (auch `.claude/skills/`, `.agents/skills/`) |
| persönlich | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |
| `name` (Pflicht) | `a-z`, `0-9`, `-`, max. 64 Zeichen, gleich dem Ordnernamen |
| `description` (Pflicht) | was die Skill tut + "Verwenden, wenn …", max. 1024 Zeichen |
| `argument-hint` | Hinweistext beim Aufruf über `/` |
| `user-invocable: false` | nicht im `/`-Menü, lädt weiter automatisch |
| `disable-model-invocation: true` | nur manueller Aufruf über `/` |
| Zusatzdateien | Vorlagen, Skripte im selben Ordner, aus `SKILL.md` relativ verlinkt |

## Prüfen und Aufrufen

| Aktion | Befehl / Ort |
| --- | --- |
| Skill gefunden? | `/` im Chat oder `/skills` (Menü "Configure Skills") |
| automatisch geladen? | Tool-Aufrufe der Antwort aufklappen: Lesezugriff auf `SKILL.md` |
| manuell aufrufen | `/add-focuslist-action Priorität ändern` |
| Ergebnis geprüft? | letzter Schritt der Skill: `npm run lint` + `npm test` bzw. `uv run ruff check .` + `uv run pytest` |

## Typische Fehler

| Symptom | Ursache |
| --- | --- |
| Skill fehlt im `/`-Menü | Ordnername ≠ `name`, Datei nicht `SKILL.md`, Punkt oder Großbuchstabe im Namen |
| Skill wird nicht automatisch geladen | `description` ohne Auslöser ("Hilft bei …") |
| Schritt wird ausgelassen | Schritte nicht nummeriert oder ohne konkreten Pfad |

_Stand: 10/2026, Quelle: [VS Code – Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)._
