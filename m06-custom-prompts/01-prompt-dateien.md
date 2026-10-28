# Prompt-Dateien

Eine Prompt-Datei (`<name>.prompt.md`) ist eine gespeicherte Chat-Anfrage: Kopf mit Einstellungen, darunter der Auftrag. Sie wird gezielt aufgerufen, z. B. mit `/<name>` im Chat, und hält den wechselnden Teil in Variablen.

## Leitfragen

<details>
<summary>Welche Chat-Anfragen werden im Arbeitsalltag fast wortgleich immer wieder getippt?</summary>

Typisch: "Erkläre diesen Code kurz", "Prüfe das gegen unsere Regeln", "Schreib Tests für …". Solche Anfragen lassen sich einmal als Datei speichern und per Name aufrufen.

</details>

<details>
<summary>Was ändert sich zwischen zwei Aufrufen derselben Anfrage, und was bleibt gleich?</summary>

Gleich bleiben Auftrag und Antwortformat. Es wechselt nur der Gegenstand: die markierte Stelle, die offene Datei oder ein Name. Genau diese Teile werden in einer Prompt-Datei zu Variablen.

</details>

<details>
<summary>Wer entscheidet, wann ein gespeicherter Ablauf startet: Copilot oder der Mensch?</summary>

Bei einer Skill (Modul 5) entscheidet Copilot anhand der `description`. Eine Prompt-Datei startet nur, wenn ein Mensch sie aufruft.

</details>

## Ein vollständiges Beispiel

Das Fremdprojekt [`sample-project/`](../project/sample-project/) bringt diese Datei bereits mit (gleich in [`sample-project-python/`](../project/sample-project-python/)):

`.github/prompts/explain-selection.prompt.md`

```markdown
---
description: Erklärt die markierte Codestelle in drei Sätzen und nennt ein Risiko
agent: ask
---

Erkläre den folgenden Code in höchstens drei Sätzen:

${selection}

Nenne danach in einer eigenen Zeile **Risiko:** einen konkreten Fall, den der Code nicht abdeckt.
```

| Teil | Wirkung |
| --- | --- |
| Ort `.github/prompts/` | Copilot findet die Datei im geöffneten Workspace |
| Dateiname `explain-selection.prompt.md` | Aufruf als `/explain-selection` (ohne Feld `name`) |
| `description` | erscheint als Erklärung im `/`-Menü |
| `agent: ask` | läuft im Ask-Modus (Modul 2): liest nur, ändert keine Datei |
| `${selection}` | wird beim Aufruf durch den markierten Code ersetzt |
| "höchstens drei Sätze", "**Risiko:**" | festes Antwortformat: jede Antwort ist gleich aufgebaut und vergleichbar |

## Felder im Kopf

Alle Felder sind optional.

| Feld | Bedeutung | Beispiel |
| --- | --- | --- |
| `description` | Kurzbeschreibung im `/`-Menü | `Prüft die geöffnete Datei gegen die Projektregeln` |
| `name` | Name nach `/`; ohne Feld gilt der Dateiname | `review` |
| `argument-hint` | Hinweistext im Eingabefeld beim Aufruf | `Aktion, z. B. set-priority` |
| `agent` | Modus: `ask`, `agent`, `plan` oder ein eigener Agent | `agent` (darf Dateien ändern, Befehle ausführen) |
| `model` | festes Sprachmodell; ohne Feld gilt die Auswahl im Chat | Modellname aus der Modellauswahl |
| `tools` | erlaubte Werkzeuge; ist `tools` gesetzt, gilt ohne `agent` der Agent-Modus | `['read', 'search', 'edit', 'execute']` |

## Variablen im Auftrag

| Variable | Wird ersetzt durch |
| --- | --- |
| `${selection}` | den markierten Text im Editor |
| `${file}` | die aktuell geöffnete Datei |
| `${fileBasename}` | nur den Dateinamen der geöffneten Datei |
| `${workspaceFolder}` | den Pfad des geöffneten Projektordners |
| `${input:name}` | einen Wert, der beim Aufruf mitgegeben wird, z. B. `/review-snippet fokus=Grenzfälle` |
| `${input:name:Platzhalter}` | wie oben; der Platzhalter beschreibt, was erwartet wird |

- Der Wert steht beim Aufruf als Text hinter dem `/`-Befehl (Muster `name=Wert`); fehlt er, fragen die meisten Modelle im Chat danach.
- Dateien im Auftrag lassen sich per Markdown-Link einbinden, z. B. `[Regeln](../copilot-instructions.md)`; der Pfad ist relativ zur Prompt-Datei.

## Drei Wege zum Aufruf

| Weg | Ablauf |
| --- | --- |
| `/`-Befehl im Chat | `/explain-selection` tippen, optional Text dahinter |
| Befehlspalette | `Ctrl+Shift+P` / `Cmd+Shift+P` → **Chat: Run Prompt** → Datei wählen |
| Play-Button | Prompt-Datei im Editor öffnen → Play-Symbol oben rechts in der Titelleiste |

Neue Dateien legt **Chat: New Prompt File** an; `/prompts` im Chat öffnet die Liste aller Prompt-Dateien. Persönliche Prompt-Dateien für alle Projekte liegen im VS-Code-Benutzerprofil.

_Stand: 10/2026, Quellen: [VS Code – Prompt files](https://code.visualstudio.com/docs/copilot/customization/prompt-files), [VS Code – Variables reference](https://code.visualstudio.com/docs/reference/variables-reference)._

## Instructions, Skill oder Prompt-Datei?

| | Instructions (Modul 4) | Skill (Modul 5) | Prompt-Datei |
| --- | --- | --- | --- |
| Datei | `.github/copilot-instructions.md`, `*.instructions.md` | `.github/skills/<name>/SKILL.md` | `.github/prompts/<name>.prompt.md` |
| Wann geladen | bei jeder Anfrage, mit `applyTo` für passende Pfade | wenn die Anfrage zur `description` passt | nur beim Aufruf |
| Wer löst aus | automatisch | Copilot per `description` oder Mensch per `/name` | Mensch per `/name`, Befehlspalette oder Play-Button |
| Inhalt | Dauerregeln | mehrstufiger Ablauf mit Vorlagen | eine Anfrage mit festem Antwortformat |

Alle drei wirken zusammen: Während eine Prompt-Datei läuft, gelten die Instructions weiter.

## Selbst ausprobieren

Im Fremdprojekt [`sample-project/`](../project/sample-project/) bzw. [`sample-project-python/`](../project/sample-project-python/), als eigener Ordner in VS Code geöffnet. Vorher einen Ordner `fremdcode/` anlegen und `snippet-1-upload`, `snippet-2-price` und `snippet-3-auth` (`.ts` bzw. `.py`) aus [`../project/snippets/`](../project/snippets/) hineinkopieren.

1. Öffne `.github/prompts/explain-selection.prompt.md` und ordne jedem Teil (Ort, Dateiname, `description`, `agent`, Variable, Antwortformat) seine Wirkung zu.
2. Markiere in `fremdcode/snippet-2-price` die Funktion `totalPrice` bzw. `total_price` und rufe `/explain-selection` auf. Markiere danach in `snippet-1-upload` die Funktion und starte denselben Prompt über **Chat: Run Prompt**.
3. Erstelle `.github/prompts/review-snippet.prompt.md`: `agent: ask`, `description`, `argument-hint`, prüft `${file}` mit einem Schwerpunkt `${input:fokus:…}`, antwortet als Tabelle Befund / Zeile / Schwere / Vorschlag mit höchstens fünf Zeilen und ändert keine Datei.
4. Wende `review-snippet` auf alle drei Snippets an: einmal mit `/review-snippet fokus=Grenzfälle`, einmal über **Chat: Run Prompt**, einmal über den Play-Button (vorher das Snippet im Editor öffnen).
5. Wende den Prompt auf `snippet-3-auth` ein zweites Mal an, jetzt mit `fokus=Sicherheit`, und vergleiche die beiden Tabellen.

<details>
<summary>Möglicher Prompt review-snippet.prompt.md</summary>

```markdown
---
description: Prüft die geöffnete Datei mit einem wählbaren Schwerpunkt und antwortet als Tabelle
agent: ask
argument-hint: fokus=Grenzfälle | Sicherheit | Lesbarkeit
---

Prüfe ${file} mit dem Schwerpunkt **${input:fokus:Grenzfälle, Sicherheit oder Lesbarkeit}**.

Antworte nur mit einer Tabelle mit den Spalten **Befund**, **Zeile**, **Schwere** (hoch / mittel / niedrig) und **Vorschlag**.
Höchstens fünf Zeilen, die schwerste zuerst. Gibt es keinen Befund, schreibe "Kein Befund zum Schwerpunkt".
Ändere keine Datei.
```

| Entscheidung | Grund |
| --- | --- |
| `agent: ask` | ein Review liest nur; Änderungen bleiben eine bewusste zweite Entscheidung |
| `${file}` statt `${selection}` | Snippets sind kurz, die ganze Datei ist der Gegenstand |
| `${input:fokus:…}` | derselbe Prompt dient für verschiedene Prüfziele |
| feste Tabelle, max. fünf Zeilen | Ergebnisse mehrerer Dateien sind direkt vergleichbar |

</details>

<details>
<summary>Erwartete Beobachtung</summary>

- `/explain-selection` liefert zwei bis drei Sätze und eine Zeile **Risiko:**, z. B. für `snippet-2-price`: "Risiko: Bei genau 100 € gibt es keinen Rabatt, obwohl die Vorgabe 'ab 100 €' lautet (`>` statt `>=`)." Für `snippet-1-upload`: "Foto.PNG" wird abgelehnt, weil der Vergleich Groß-/Kleinschreibung beachtet; eine Obergrenze für die Größe fehlt. Die Form ist gleich, weil sie im Prompt steht.
- `/` zeigt `explain-selection` und `review-snippet` mit ihren Beschreibungen.
- Jede Antwort von `review-snippet` ist eine Tabelle mit vier Spalten; keine Datei wird geändert. Wichtigster Befund je Snippet (Schwerpunkt Grenzfälle):

| Snippet | Wichtigster Befund |
| --- | --- |
| `snippet-1-upload` | Endung in Großbuchstaben (`.PNG`) wird abgelehnt; keine Maximalgröße |
| `snippet-2-price` | Grenze 100 €: `>` statt `>=`, Rabatt fehlt bei genau 100 €; negative Mengen werden mitgerechnet; keine Rundung auf Cent |
| `snippet-3-auth` | fehlender `user` wird nicht ausdrücklich abgelehnt |

- Mit `fokus=Sicherheit` rückt bei `snippet-3-auth` der fehlende Nutzer nach oben (Schwere hoch). JS/TS: `user?.id === doc.ownerId` ist `true`, wenn auch `ownerId` fehlt; das Typsystem verhindert das, Daten aus JSON oder einer Datenbank nicht. Python: `owner_id` ist `str | None`, ohne Nutzer gilt `None == None` → `True`, eine anonyme Anfrage darf löschen. Vorschlag: `if user is None: return False` an den Anfang.
- Zeilennummern und Formulierungen variieren je Lauf; die Tabellenform bleibt.
- Erscheint ein Prompt nicht im `/`-Menü: Der geöffnete Workspace-Ordner muss `sample-project` selbst sein, und die Datei muss auf `.prompt.md` enden.
- Zusatz: Mit `name: review` im Kopf heißt der Befehl `/review`; der Dateiname spielt für den Aufruf dann keine Rolle mehr.

</details>

## Fazit

- Eine Prompt-Datei ist eine gespeicherte Anfrage unter `.github/prompts/<name>.prompt.md`, aufgerufen mit `/<name>`, **Chat: Run Prompt** oder dem Play-Button.
- `agent` steuert, ob der Prompt nur liest (`ask`) oder Dateien ändert (`agent`).
- Variablen wie `${selection}`, `${file}` und `${input:name}` halten den wechselnden Teil, das Antwortformat bleibt fest.

Als Nächstes entsteht daraus eine Bibliothek für FocusList: [Prompt-Bibliothek](./02-prompt-bibliothek.md).
