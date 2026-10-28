# Transfer: Zweite Skill und Suche für FocusList (optional)

Diese Übung verbindet Modul 5 und 6 an einer neuen Funktion: eine zweite Skill schreiben, die neue Aktion mit der Prompt-Bibliothek prüfen und die Doku nachziehen.

## Leitfragen

<details>
<summary>Was passiert, wenn zwei Skills zur selben Anfrage passen?</summary>

Copilot kann beide lesen. Eine Skill liefert den Ablauf (Aktion, CLI, Test, Prüfen), die andere die fachlichen Regeln. Fehlt eine, fehlt meist der passende Teil im Ergebnis.

</details>

<details>
<summary>Muss jede Skill aus nummerierten Schritten bestehen?</summary>

Nein. Eine Skill kann auch eine Regelliste für eine Aufgabenart sein, z. B. "Suchen ändert nie gespeicherte Daten". Der Ablauf kommt dann aus einer anderen Skill.

</details>

## Die Regeln der neuen Skill

`filter-and-search-tasks` ist eine Regelliste, keine Schrittfolge:

| Regel | JS/TS | Python |
| --- | --- | --- |
| Suchen ändert nie gespeicherte Daten | nur `readTasks()`, nie `writeTasks()` | nur `read_tasks()`, nie `write_tasks()` |
| Groß-/Kleinschreibung egal | `toLowerCase()` auf beiden Seiten | `.lower()` auf beiden Seiten |
| leerer Suchbegriff | `throw new Error(...)` | `raise ValueError(...)` |
| kein Treffer | leere Liste, kein Fehler | leere Liste, kein Fehler |
| wohin | Filter in `ListFilter` in `src/actions/list-tasks.ts`, Suche in `src/actions/search-tasks.ts` | Filter als Parameter von `list_tasks`, Suche in `focuslist/actions/search_tasks.py` |
| Tests pro Funktion | Treffer, kein Treffer, Groß-/Kleinschreibung, ungültige Eingabe | gleich |

## Übung

**Start:** eigener Stand aus [Doku mit KI](./03-doku-mit-ki.md): Skill `add-focuslist-action`, vier Aktionen, vier Prompts in `.github/prompts/`, `README.md`, `CHANGELOG.md`
**Referenz:** [`steps/m06/`](../project/focuslist/js-ts/steps/m06/) bzw. [Python](../project/focuslist/python/steps/m06/) — nur die in Modul 6 geänderten Dateien
**Dauer:** 30 Min.

1. Erstelle `.github/skills/filter-and-search-tasks/SKILL.md`. Die `description` nennt Suchen und Filtern von Tasks und die Auslöser ("Verwenden, wenn …"); der Rumpf hält die Regeln aus der Tabelle fest.
2. Prüfe im `/`-Menü, ob beide Skills erscheinen.
3. Starte einen neuen Chat und schreibe, ohne eine Skill zu nennen: "Baue eine Suche, die Aufgaben über einen Begriff im Titel findet." Prüfe in den Tool-Aufrufen, welche `SKILL.md`-Dateien gelesen wurden.
4. Prüfe das Ergebnis gegen beide Skills: neue Aktionsdatei, CLI-Eintrag mit `USAGE`-Zeile, Test, kein Schreibzugriff in der Suchfunktion.
5. Führe die Suche über die CLI aus: zwei Aufgaben anlegen, einmal mit Treffer in anderer Schreibweise (`STEUER`), einmal ohne Treffer, einmal mit leerem Begriff (`"  "`).
6. Rufe `/add-missing-tests aktion=search-tasks` (Python: `aktion=search_tasks`) auf und übernimm nur Tests, die einen noch fehlenden Fall aus der Skill abdecken.
7. Öffne die neue Aktionsdatei und rufe `/focuslist-code-review` auf.
8. Rufe `/generate-docs` auf und prüfe, dass README und Changelog jetzt genau fünf Befehle bzw. Einträge haben.

**Checkpoint:**

- `/` zeigt `add-focuslist-action` und `filter-and-search-tasks`.
- `search-tasks STEUER` findet "Steuererklärung …"; ohne Treffer gibt es keine Ausgabe und Exit-Code 0; ein leerer Begriff endet mit `Fehler: Suchbegriff darf nicht leer sein.`
- Die Suchfunktion ruft nur `readTasks` bzw. `read_tasks` auf.
- README "Befehle" und `CHANGELOG.md` nennen `search-tasks`; Lint und Tests grün (`npm test` → 15/15, `uv run pytest` → `15 passed`).

```text
$ npx tsx src/cli.ts add-task "Steuererklärung abgeben" high
c88921e8  [ ] Steuererklärung abgeben (high)
$ npx tsx src/cli.ts add-task "Einkaufen"
16b5553a  [ ] Einkaufen (medium)

$ npx tsx src/cli.ts search-tasks STEUER
c88921e8  [ ] Steuererklärung abgeben (high)

$ npx tsx src/cli.ts search-tasks Urlaub
$ echo $?
0

$ npx tsx src/cli.ts search-tasks "  "
Fehler: Suchbegriff darf nicht leer sein.
```

Python (`uv run focuslist …`) liefert dieselben Zeilen mit anderen ids. Ohne jedes Argument gibt Python die `USAGE` aus, weil `argparse` mindestens ein Wort verlangt; JS/TS meldet dann `Fehler: Suchbegriff darf nicht leer sein.` Beide enden mit Exit-Code 1.

<details>
<summary>Erwartete Beobachtungen</summary>

- Die Anfrage enthält "Suche" und "Aufgaben … finden" (passt zu `filter-and-search-tasks`) und verlangt eine neue Aktion (passt zu `add-focuslist-action`). Typisch sind Lesezugriffe auf **beide** `SKILL.md`-Dateien. Wird nur eine gelesen, fehlt meist der CLI-Eintrag oder eine Suchregel; dann die fehlende Skill mit `/` dazunehmen.
- Die vier Pflichtfälle der Skill sind nach Schritt 3 meist schon getestet. Sinnvolle Ergänzung aus der ersten Regel: Die Suche ändert nichts (`listTasks()` vorher und nachher gleich). Vorschläge wie "Sonderzeichen" oder "sehr langer Begriff" sind keine Regel der Skill und können entfallen.
- Review: Regel 3 ("Eingabewerte über `validation.ts`") ist "nicht relevant", der Suchbegriff ist keine Priorität; alle anderen Regeln "eingehalten".
- Zusatz: "Zeige nur Aufgaben mit hoher Priorität, die noch offen sind." Erwartet ist `list-tasks --status open --priority high` bzw. `listTasks({ status: "open", priority: "high" })`, weil beide Filter schon existieren. Entsteht eine neue Datei wie `filter-tasks.ts`, verletzt das die Regel "bestehende Filter erweitern"; mit **Undo** verwerfen.

</details>

**Falls es hakt:**

- Liest Copilot die neue Skill nicht: direkt mit `/filter-and-search-tasks Suche im Titel` aufrufen.
- Bleibt die Suche aus: Aktion, Test, CLI-Eintrag und Skill aus `steps/m06/` übernehmen und ab Schritt 5 weiterarbeiten.

### Was sich in der Referenz geändert hat

| Datei (JS/TS · Python) | Änderung |
| --- | --- |
| `.github/skills/filter-and-search-tasks/SKILL.md` | neu: Regelliste wie oben |
| `src/actions/search-tasks.ts` · `focuslist/actions/search_tasks.py` | neu: Begriff trimmen und klein schreiben, leer → Fehler, sonst Titel filtern; nur lesen |
| `src/cli.ts` · `focuslist/cli.py` | Unterbefehl `search-tasks <begriff>` samt `USAGE`-Zeile |
| `tests/actions/search-tasks.test.ts` · `test_search_tasks.py` | neu: Treffer mit `STEUER`, kein Treffer, leerer Begriff, Suche ändert nichts |
| `README.md`, `CHANGELOG.md` | fünfter Befehl bzw. Eintrag `search-tasks` |

## Fazit

- Eine Skill kann ein Ablauf oder eine Regelliste sein; mehrere Skills ergänzen sich in einer Anfrage.
- Die Prompt-Bibliothek prüft neue Aktionen ohne neue Formulierung: Tests, Review und Doku per `/`-Befehl.
- Mit fünf Aktionen, vier Prompts und zwei Skills entspricht FocusList dem Stand v3.

Modul 7 macht aus wiederkehrenden Rollen wie "Tester" eigene Agenten.
