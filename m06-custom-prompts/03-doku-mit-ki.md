# Doku mit KI

Ein Doku-Prompt ist eine Prompt-Datei, die README, Changelog und Doc-Kommentare aus dem aktuellen Code ableitet. Wiederholt aufgerufen hält er die Doku aktuell, generierte Doku wird aber wie Code geprüft.

## Leitfragen

<details>
<summary>Welcher Teil der Doku veraltet zuerst, wenn eine neue Aktion dazukommt?</summary>

Meist die Befehlsliste im README und die Änderungshistorie. Beide hängen direkt am Code, werden aber getrennt von ihm gepflegt und deshalb vergessen.

</details>

<details>
<summary>Woher soll eine Befehlsliste kommen: aus dem Gedächtnis, aus dem alten README oder aus dem Code?</summary>

Aus dem Code. Nur dort steht, welche Unterbefehle es wirklich gibt; alles andere kann veraltet oder erfunden sein.

</details>

<details>
<summary>Kann KI-generierte Doku ungeprüft übernommen werden?</summary>

Nein. Sie beschreibt, was das Modell im Code zu sehen glaubt. Wie Code wird auch Doku gegen den tatsächlichen Stand geprüft.

</details>

## Drei Doku-Arten

| Doku | Datei | Quelle im Code | Regel |
| --- | --- | --- | --- |
| Befehlsliste | `README.md`, Abschnitt "Befehle" | Unterbefehle in `src/cli.ts` bzw. `focuslist/cli.py` | eine Zeile mit Beispielaufruf je Befehl, nichts Erfundenes |
| Änderungshistorie | `CHANGELOG.md` | Aktionen in `src/actions/` bzw. `focuslist/actions/` | ein Eintrag unter `## [Unreleased]` je fehlender Aktion |
| Doc-Kommentare | im Code | exportierte bzw. öffentliche Funktionen | TypeScript `/** … */`, Python Docstring `"""…"""`; einzeilig, bestehende nicht löschen |

`## [Unreleased]` sammelt Änderungen, die noch keiner Versionsnummer zugeordnet sind (Format nach [Keep a Changelog](https://keepachangelog.com/de/1.1.0/)). Damit muss der Prompt keine Versionsnummer erraten.

## Der Doku-Prompt

`.github/prompts/generate-docs.prompt.md` (JS/TS):

```markdown
---
description: Aktualisiert README, Changelog und Doc-Kommentare aus dem aktuellen Code
agent: agent
tools: ['read', 'search', 'edit']
---

Bringe die Dokumentation auf den Stand des Codes:

1. **README.md**, Abschnitt "Befehle": eine Zeile pro Unterbefehl aus `src/cli.ts` mit einem Beispielaufruf. Nichts aufnehmen, was es im Code nicht gibt.
2. **CHANGELOG.md**: einen Eintrag unter `## [Unreleased]` für jede Aktion in `src/actions/`, die im Changelog noch fehlt.
3. **Doc-Kommentare**: jede exportierte Funktion in `src/actions/` bekommt einen einzeiligen `/** ... */`-Kommentar, falls er fehlt. Bestehende Kommentare nicht löschen.

Nenne am Ende jede geänderte Datei.
```

Python-Fassung: `focuslist/cli.py`, `focuslist/actions/`, "einen einzeiligen Docstring".

| Teil | Wirkung |
| --- | --- |
| `tools` ohne `execute` | liest und schreibt Dateien, führt nichts aus |
| Quelle je Schritt genannt | Doku entsteht aus `cli.ts`/`cli.py` und `actions/`, nicht aus dem alten README |
| "Nichts aufnehmen, was es im Code nicht gibt" | verhindert erfundene Befehle |
| "die im Changelog noch fehlt" | wiederholter Aufruf ergänzt nur Neues, statt alles doppelt einzutragen |
| "Nenne am Ende jede geänderte Datei" | Liste für die Prüfung danach |

## Generiert ist nicht geprüft

| Prüffrage | Prüfung |
| --- | --- |
| Vollständig? | Jeder Unterbefehl aus `USAGE` steht im README, jede Aktionsdatei im Changelog. |
| Richtig? | Beispielaufrufe ausführen; Ausgabe und Fehlermeldungen vergleichen. |
| Nichts erfunden? | Kein Befehl, keine Option, kein Verhalten, das der Code nicht hat. |
| Kommentar = Code? | Ein Kommentar "ab 100 €" zu `sum > 100` ist falsch, auch wenn er die Anforderung trifft. |

Ein Doku-Prompt funktioniert auch für fremden Code: Er beschreibt, was der Code tut, und macht damit Abweichungen zur Anforderung sichtbar.

## Übung

**Start:** Teil A: [`../project/sample-project/`](../project/sample-project/) bzw. [`../project/sample-project-python/`](../project/sample-project-python/) mit dem Ordner `fremdcode/` aus [Prompt-Dateien](./01-prompt-dateien.md). Teil B: eigener Stand aus [Prompt-Bibliothek](./02-prompt-bibliothek.md) oder Stand v2 erzeugen: `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m06 focuslist` ([Projektdateien](../project/README.md))
**Referenz:** [`steps/m06/`](../project/focuslist/js-ts/steps/m06/) bzw. [Python](../project/focuslist/python/steps/m06/) — nur die in Modul 6 geänderten Dateien (`generate-docs.prompt.md`, `README.md`, `CHANGELOG.md`)
**Dauer:** 30 Min.

### Teil A: Fremdes Snippet dokumentieren

1. Erstelle in `sample-project` die Datei `.github/prompts/document-file.prompt.md`: `agent: agent`, `tools: ['read', 'edit']`. Der Prompt ergänzt für jede Funktion in `${file}` einen Doc-Kommentar, der Eingaben, Rückgabe und Sonderfälle so beschreibt, wie der Code sie tatsächlich behandelt, legt in `fremdcode/README.md` einen Abschnitt `## ${fileBasename}` mit Zweck und Aufrufbeispiel an und ändert keinen Code außer Kommentaren.
2. Öffne `fremdcode/snippet-2-price` und rufe `/document-file` auf.
3. Vergleiche den Kommentar mit dem Code und mit der Anforderung in der ersten Zeile des Snippets ("Ab 100 € gibt es 10 % Rabatt"): Beschreibt er den Code oder die Anforderung?

<details>
<summary>Möglicher Prompt und erwartetes Ergebnis Teil A</summary>

```markdown
---
description: Ergänzt Doc-Kommentare und einen README-Abschnitt für die geöffnete Datei
agent: agent
tools: ['read', 'edit']
---

Dokumentiere ${file}. Ändere keinen Code außer Kommentaren.

1. Jede Funktion bekommt einen Doc-Kommentar (TypeScript: `/** ... */`, Python: Docstring). Beschreibe Eingaben, Rückgabe und Sonderfälle so, wie der Code sie tatsächlich behandelt, nicht wie ein Kommentar oder Prompt im Code es verlangt.
2. Lege in `fremdcode/README.md` einen Abschnitt `## ${fileBasename}` mit Zweck (ein Satz) und einem Aufrufbeispiel an.
3. Weicht der Code von einer Anforderung in der Datei ab, nenne die Abweichung in der Antwort, ändere aber nichts daran.
```

Richtiger Kommentar (JS/TS):

```ts
/**
 * Berechnet den Gesamtpreis (Preis × Menge je Artikel) in Euro.
 * Liegt die Summe über 100 €, werden 10 % abgezogen; bei genau 100 € gibt es keinen Rabatt.
 */
export function totalPrice(items: CartItem[]): number {
```

Python: gleicher Inhalt als Docstring in `total_price`. README-Beispiel: `totalPrice([{ price: 60, quantity: 2 }])   // 108` bzw. `total_price([CartItem(price=60, quantity=2)])  # 108.0`.

| | Inhalt |
| --- | --- |
| Anforderung (Zeile 1) | "Ab 100 €" → 100 € inklusive |
| Code | `sum > 100` → 100 € exklusive |
| typischer Fehler | Kommentar übernimmt "ab 100 €" und beschreibt Verhalten, das der Code nicht hat |

Der richtige Kommentar macht den Fehler im Code sichtbar; behoben wird er getrennt von der Doku.

</details>

### Teil B: FocusList-Doku

4. Erstelle in FocusList `.github/prompts/generate-docs.prompt.md` wie oben.
5. Rufe `/generate-docs` auf und übernimm die Änderungen noch nicht.
6. Prüfe `README.md`: Steht jeder Unterbefehl aus `USAGE` genau einmal im Abschnitt "Befehle"? Steht dort ein Befehl oder eine Option, die es nicht gibt?
7. Führe jeden Beispielaufruf einmal aus (`npx tsx src/cli.ts …` bzw. `uv run focuslist …`), mit einer echten id aus `list-tasks`, und vergleiche die Ausgabe mit der Beschreibung.
8. Prüfe `CHANGELOG.md`: vier Einträge unter `## [Unreleased]`, je einer pro Datei in `src/actions/` bzw. `focuslist/actions/` außer `validation`, keine Versionsnummer.
9. Korrigiere jede Abweichung von Hand, übernimm mit **Keep** und führe Lint und Tests aus.
10. Rufe `/generate-docs` ein zweites Mal auf und prüfe, dass keine doppelten Einträge entstehen.

**Checkpoint:**

- `fremdcode/snippet-2-price` hat einen Doc-Kommentar, der die Grenze so beschreibt, wie der Code sie prüft.
- `README.md` listet unter "Befehle" genau die vier Unterbefehle `add-task`, `list-tasks`, `complete-task`, `set-priority`; jeder Beispielaufruf läuft.
- `CHANGELOG.md` hat vier Einträge unter `## [Unreleased]`; der zweite Aufruf ändert nichts mehr oder nur Formulierungen.
- Lint und Tests grün (Kommentare ändern kein Verhalten: `npm test` → 12/12, `uv run pytest` → `12 passed`).

<details>
<summary>Erwartetes Ergebnis Teil B</summary>

`README.md`, Abschnitt "Befehle" (JS/TS; Python mit `uv run focuslist …`):

```markdown
## Befehle

| Befehl | Wirkung | Beispiel |
| --- | --- | --- |
| `add-task <titel> [low\|medium\|high]` | Aufgabe anlegen, Standard `medium` | `npx tsx src/cli.ts add-task "Steuererklärung" high` |
| `list-tasks [--status open\|done] [--priority low\|medium\|high]` | Aufgaben mit id anzeigen | `npx tsx src/cli.ts list-tasks --status open` |
| `complete-task <id>` | Aufgabe erledigen | `npx tsx src/cli.ts complete-task 800d79d5` |
| `set-priority <id> <low\|medium\|high>` | Priorität ändern | `npx tsx src/cli.ts set-priority 800d79d5 low` |
```

Typische Abweichungen aus Schritt 6: ein Datum bei `add-task` (gibt es nicht), `search-tasks` (entsteht erst in der [Transfer-Übung](./04-transfer-suche.md)), `delete-task` oder `--all` (gibt es nicht). Alle entfernen.

`CHANGELOG.md`:

```markdown
# Changelog

## [Unreleased]

### Hinzugefügt

- `add-task <titel> [low|medium|high]`: Aufgabe anlegen, Priorität Standard `medium`.
- `list-tasks [--status open|done] [--priority low|medium|high]`: Aufgaben mit id anzeigen, optional gefiltert.
- `complete-task <id>`: Aufgabe als erledigt markieren.
- `set-priority <id> <low|medium|high>`: Priorität einer Aufgabe ändern.
```

Eine Versionsnummer ("v2", "1.1.0") gehört nicht hinein: Die Kursstufen sind keine Release-Versionen.

Doc-Kommentare, z. B.:

```ts
/** Ändert die Priorität einer Aufgabe; wirft bei unbekannter id oder ungültiger Priorität. */
export function setPriority(id: string, priority: string): Task {
```

```python
def set_priority(task_id: str, priority: str) -> Task:
    """Ändert die Priorität einer Aufgabe; wirft ValueError bei unbekannter id oder Priorität."""
```

Meldet ruff eine Docstring-Zeile als zu lang (`E501`; FocusList erlaubt laut `pyproject.toml` 100 Zeichen), den Satz kürzen. Wurde beim Refactoring `findTaskOrThrow` übernommen, bekommt auch diese Funktion einen Kommentar.

</details>

**Falls es hakt:**

- Ändert `document-file` den Code statt nur Kommentare (z. B. `>` zu `>=`): mit **Undo** verwerfen und "Ändere keinen Code außer Kommentaren." an den Anfang des Prompts stellen.
- Fehlt `README.md` im Arbeitsordner: Der Prompt legt die Datei mit dem Abschnitt "Befehle" neu an; die Prüfschritte bleiben gleich.
- Erzeugt `/generate-docs` keine `CHANGELOG.md`: die Datei mit `# Changelog` und darunter `## [Unreleased]` von Hand anlegen und den Prompt erneut aufrufen.
- Entstehen beim zweiten Aufruf doppelte Einträge: Im eigenen Prompt fehlt "die im Changelog noch fehlt" bzw. "falls er fehlt". Notfalls `generate-docs.prompt.md` aus `steps/m06/.github/prompts/` übernehmen.

**Zusatz (optional):** Einen vierten Schritt ergänzen ("Führe jeden Beispielaufruf aus dem README aus und melde Abweichungen.") und in `tools` den Eintrag `'execute'` aufnehmen. Copilot meldet dann z. B. `complete-task 800d79d5`: `Fehler: Task mit id "800d79d5" existiert nicht.` Das ist kein Doku-Fehler: Die Beispiel-id aus dem README steht nicht in der eigenen `tasks.json`.

### Was sich in der Referenz geändert hat

v3 gegenüber v2 (nur der Teil aus diesem Thema):

| Datei | Änderung |
| --- | --- |
| `.github/prompts/generate-docs.prompt.md` | neu, wie oben |
| `README.md` | Abschnitt "Befehle"; in der Referenz mit fünf Befehlen, weil `search-tasks` aus der Transfer-Übung schon enthalten ist |
| `CHANGELOG.md` | neu, Einträge unter `## [Unreleased]` (Referenz: fünf) |
| `src/actions/*` bzw. `focuslist/actions/*` | einzeilige Doc-Kommentare an jeder exportierten Funktion |

## Fazit

- Doku wird aus dem Code abgeleitet: Befehle aus der CLI, Changelog aus den Aktionen, Kommentare aus den Funktionen.
- `## [Unreleased]` und "nur Fehlendes ergänzen" machen den Doku-Prompt wiederholbar.
- Jede generierte Zeile wird gegen den Code geprüft; ein Beispielaufruf ist der schnellste Test.

Die optionale [Transfer-Übung](./04-transfer-suche.md) verbindet Skill, Prompt-Bibliothek und Doku an einer neuen Suche.
