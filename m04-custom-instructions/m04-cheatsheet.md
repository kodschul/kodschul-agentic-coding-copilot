# Cheatsheet Modul 4: Custom Instructions

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/customization/custom-instructions

## Dateien ([01](01-copilot-instructions.md), [02](02-instructions-dateien.md))

| Datei / Element | Wirkung |
| --- | --- |
| `.github/copilot-instructions.md` | gilt für jede Chat-Anfrage im Workspace |
| `.github/instructions/<name>.instructions.md` | gilt nur für Pfade aus `applyTo` |
| `applyTo: "tests/**/*.test.ts"` / `"tests/**/*.py"` | nur Testdateien |
| `applyTo: "**"` | alle Dateien |
| `chat.instructionsFilesLocations` | weitere Ablageorte für `*.instructions.md` |
| `/init` | Entwurf für Workspace-Instructions erzeugen |
| Liste **Referenzen** unter der Antwort | zeigt, welche Instructions genutzt wurden |

## Gute Regeln

| Merkpunkt | Beispiel |
| --- | --- |
| prüfbar im Diff | "Aktionen werfen einen `Error`, nie `null`" |
| nummeriert | "Setze Regel 2 um." |
| Verbote benennen | "Nur `json-store.ts` liest oder schreibt die Datei." |
| wenige, priorisiert | 5 Regeln statt langer Best-Practice-Liste |
| Grenze | keine Garantie; Vergleiche in neuem Chat |

## v0 → v1 ([03](03-regeln-anwenden.md))

| Befehl / Schritt | Wirkung |
| --- | --- |
| Start | Stand v0: `node project/focuslist/catch-up.mjs <stack> m04 focuslist` |
| Muss-Punkt → nummerierte Regel | im Diff prüfbar, per Nummer referenzierbar |
| `Setze Regel 2 um.` (Agent-Modus) | Refactoring Schritt für Schritt |
| `/tests Erfolgsfall und Fehlerfälle` | erste Tests je Aktion |
| `npm run lint` + `npm test` / `uv run ruff check .` + `uv run pytest` | v1 ist erreicht, wenn beides grün ist |
| Referenz / Rettungsanker | `project/focuslist/<stack>/steps/m04/`; Stand v1: `catch-up.mjs <stack> m05 focuslist --force` |
