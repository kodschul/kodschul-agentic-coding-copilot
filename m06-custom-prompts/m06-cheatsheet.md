# Cheatsheet Modul 6: Prompt-Dateien

Themen: [Prompt-Dateien](./01-prompt-dateien.md) · [Prompt-Bibliothek](./02-prompt-bibliothek.md) · [Doku mit KI](./03-doku-mit-ki.md) · [Transfer: Suche](./04-transfer-suche.md) · fertige Bibliothek: [JS/TS](../project/focuslist/js-ts/steps/m06/.github/prompts), [Python](../project/focuslist/python/steps/m06/.github/prompts)

## Datei und Aufruf

| Aktion | Befehl / Ort |
| --- | --- |
| Ort im Projekt | `.github/prompts/<name>.prompt.md` |
| neue Datei | Befehlspalette → **Chat: New Prompt File** |
| Aufruf im Chat | `/<name>`, optional mit Text dahinter (`/add-missing-tests aktion=set-priority`) |
| Aufruf über Befehlspalette | **Chat: Run Prompt** → Datei wählen |
| Aufruf aus dem Editor | Prompt-Datei öffnen → Play-Button in der Titelleiste |
| alle Prompt-Dateien | `/prompts` im Chat |

## Kopf (alle Felder optional)

| Feld | Wirkung |
| --- | --- |
| `description` | Text im `/`-Menü |
| `name` | Name nach `/`; ohne Feld der Dateiname |
| `argument-hint` | Hinweis im Eingabefeld |
| `agent` | `ask` (nur lesen), `agent` (ändert Dateien, führt Befehle aus), `plan` oder eigener Agent |
| `model` | festes Modell statt der Auswahl im Chat |
| `tools` | erlaubte Werkzeuge, z. B. `['read', 'search', 'edit', 'execute']` (`execute` = Befehle im Terminal) |

## Variablen

| Variable | Wert |
| --- | --- |
| `${selection}` | markierter Text |
| `${file}` / `${fileBasename}` | geöffnete Datei / nur ihr Name |
| `${workspaceFolder}` | Projektordner |
| `${input:name}` / `${input:name:Platzhalter}` | Wert beim Aufruf |
| `[Text](../copilot-instructions.md)` | Datei einbinden, Pfad relativ zur Prompt-Datei |

## FocusList-Bibliothek

| Datei | `agent` | Zweck |
| --- | --- | --- |
| `focuslist-code-review.prompt.md` | `ask` | `${file}` gegen jede Projektregel prüfen, nichts ändern |
| `add-missing-tests.prompt.md` | `agent` | fehlende Fälle auflisten, nur diese Tests ergänzen |
| `refactor-action.prompt.md` | `agent` | Struktur verbessern, Verhalten, Meldungen und Tests unverändert |
| `generate-docs.prompt.md` | `agent` | README "Befehle", `CHANGELOG.md` `## [Unreleased]`, Doc-Kommentare aus dem Code |

## Regeln

| Regel | Grund |
| --- | --- |
| eine Aufgabe pro Datei | Ergebnis bleibt prüfbar |
| Review mit `agent: ask` + "Ändere keine Datei" | Review ändert nicht ungefragt |
| festes Antwortformat (Tabelle) | Ergebnisse sind vergleichbar |
| Prüfbefehl am Ende | Copilot belegt "fertig" mit Tests |
| generierte Doku gegen Code prüfen | Doku beschreibt sonst Verhalten, das es nicht gibt |
| Änderungen mit **Keep** übernehmen, mit **Undo** verwerfen | bewusste Entscheidung pro Änderung |

_Stand: 10/2026, Quellen: [VS Code – Prompt files](https://code.visualstudio.com/docs/copilot/customization/prompt-files), [VS Code – Variables reference](https://code.visualstudio.com/docs/reference/variables-reference)._
