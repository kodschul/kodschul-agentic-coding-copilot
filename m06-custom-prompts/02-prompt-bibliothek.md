# Prompt-Bibliothek

Eine Prompt-Bibliothek ist eine Sammlung kleiner Prompt-Dateien in `.github/prompts/`, je eine pro wiederkehrender Aufgabe. Für FocusList entstehen drei: Review, fehlende Tests, Refactoring.

## Leitfragen

<details>
<summary>Welche Prüfungen wiederholen sich bei jeder neuen FocusList-Aktion?</summary>

Passt der Code zu den Projektregeln? Fehlen Testfälle? Ist Code doppelt entstanden, der sich zusammenfassen lässt? Drei Fragen, die nach jeder Aktion wieder gestellt werden.

</details>

<details>
<summary>Woran erkennt ein Review, ob Code zu den Projektregeln passt, und nicht nur, ob er "gut aussieht"?</summary>

Es prüft Regel für Regel gegen eine feste Liste, hier die Regeln aus `copilot-instructions.md` (Modul 4), und nennt für jede Regel ein Ergebnis mit Fundstelle.

</details>

<details>
<summary>Warum nicht Review, Tests und Umbau in einer einzigen Anfrage erledigen?</summary>

Ein Review soll nichts ändern, Tests ergänzen soll nur Tests ändern, ein Umbau soll nur Code ändern. In einer Anfrage verschwimmen diese Grenzen, und das Ergebnis lässt sich schwer prüfen.

</details>

## Die Bibliothek im Überblick

| Datei | `agent` | Variable | Darf ändern | Aufruf |
| --- | --- | --- | --- | --- |
| `focuslist-code-review.prompt.md` | `ask` | `${file}` | nichts | Datei öffnen, `/focuslist-code-review` |
| `add-missing-tests.prompt.md` | `agent` | `${input:aktion}` | nur Tests | `/add-missing-tests aktion=set-priority` |
| `refactor-action.prompt.md` | `agent` | `${input:aktion}` | nur Code, keine Tests | `/refactor-action aktion=complete-task` |

## Review-Prompt

`.github/prompts/focuslist-code-review.prompt.md` (beide Stacks gleich):

```markdown
---
description: Prüft die geöffnete Datei gegen die FocusList-Projektregeln
agent: ask
---

Prüfe ${file} gegen jede Regel in [copilot-instructions.md](../copilot-instructions.md).

Antworte als Tabelle mit den Spalten **Regel**, **Ergebnis** (eingehalten / verletzt / nicht relevant) und **Fundstelle** (Zeilennummer). Schlage für jede Verletzung eine konkrete Änderung vor. Ändere selbst keine Datei.
```

- Der Markdown-Link bindet die Projektregeln ein; der Pfad ist relativ zur Prompt-Datei (`.github/prompts/` → `.github/`).
- Die drei Ergebniswerte erzwingen eine Aussage pro Regel statt einer Gesamtnote.

## Test-Prompt

`.github/prompts/add-missing-tests.prompt.md`:

```markdown
---
description: Ergänzt fehlende Tests für eine FocusList-Aktion
agent: agent
tools: ['read', 'search', 'edit', 'execute']
argument-hint: Aktion, z. B. set-priority
---

Ergänze fehlende Tests für die Aktion `${input:aktion:Name der Aktion, z. B. set-priority}`.

1. Lies `src/actions/${input:aktion}.ts` und den vorhandenen Test unter `tests/actions/`.
2. Liste zuerst auf, welche Fälle fehlen: Erfolgsfall, unbekannte id, ungültige Eingabe, Grenzfälle.
3. Ergänze nur die fehlenden Tests. Bestehende Tests nicht ändern.
4. Führe `npm test` aus und melde das Ergebnis.
```

Python: `argument-hint: Aktion, z. B. set_priority`, Pfad `focuslist/actions/${input:aktion}.py`, Prüfbefehl `uv run pytest`.

| Teil | Wirkung |
| --- | --- |
| `tools` | lesen, suchen, Dateien ändern, Befehle im Terminal ausführen (`execute`) |
| `${input:aktion}` zweimal | derselbe Wert steuert Aufgabe und Dateipfad |
| Schritt 2 vor Schritt 3 | erst die Lücke benennen, dann schreiben: das Ergebnis ist prüfbar |
| "Bestehende Tests nicht ändern" | ein roter Test wird nicht passend gemacht |

## Refactoring-Prompt

`.github/prompts/refactor-action.prompt.md`:

```markdown
---
description: Vereinfacht eine FocusList-Aktion, ohne ihr Verhalten zu ändern
agent: agent
tools: ['read', 'search', 'edit', 'execute']
argument-hint: Aktion, z. B. complete-task
---

Refaktoriere die Aktion `${input:aktion:Name der Aktion, z. B. complete-task}`, ohne ihr Verhalten zu ändern.

1. Führe `npm test` aus. Ist ein Test rot, brich ab und melde das.
2. Lies `src/actions/${input:aktion}.ts`, die übrigen Dateien in `src/actions/` und [copilot-instructions.md](../copilot-instructions.md).
3. Liste vor jeder Änderung auf: doppelter Code (auch in anderen Aktionen), Verstöße gegen die Projektregeln, unklare Namen. Ein Satz pro Punkt.
4. Setze nur diese Punkte um. Exportierte Signaturen, Fehlermeldungen und Tests bleiben unverändert; keine neuen Abhängigkeiten.
5. Führe `npm run lint` und `npm test` aus und nenne jede geänderte Datei.
```

Python: `.py`-Pfade unter `focuslist/actions/`, "Öffentliche Signaturen", Prüfbefehle `uv run ruff check .` und `uv run pytest`.

- Refactoring heißt: Struktur ändern, Verhalten nicht. Die vorhandenen Tests sind der Beweis; deshalb laufen sie vorher und nachher.
- Änderungen eines `agent`-Prompts erscheinen im Chat mit den Schaltflächen **Keep** (übernehmen) und **Undo** (verwerfen).

## Regeln für gute Bibliotheks-Prompts

| Regel | Beispiel in der Bibliothek |
| --- | --- |
| eine Aufgabe pro Datei | Review, Tests und Umbau getrennt |
| so wenig Rechte wie nötig | Review mit `agent: ask` |
| Grenze ausdrücklich nennen | "Ändere selbst keine Datei", "Bestehende Tests nicht ändern" |
| festes Ausgabeformat | Tabelle Regel / Ergebnis / Fundstelle |
| Prüfung am Ende | `npm test` bzw. `uv run pytest` |
| Projektwissen verlinken statt kopieren | Link auf `copilot-instructions.md` |

> **Merksatz:** Ein Bibliotheks-Prompt sagt, was er tun soll, was er nicht tun darf und woran das Ergebnis geprüft wird.

Ein Review-Prompt ersetzt kein menschliches Review; er listet offensichtliche Abweichungen vorab.

## Übung

**Start:** eigener Stand aus Modul 5 oder Stand v2 erzeugen: `node <kursmaterial>/project/focuslist/catch-up.mjs <stack> m06 focuslist` ([Projektdateien](../project/README.md))
**Referenz:** [`steps/m06/.github/prompts/`](../project/focuslist/js-ts/steps/m06/.github/prompts/) bzw. [Python](../project/focuslist/python/steps/m06/.github/prompts/) — nur die in Modul 6 geänderten Dateien
**Dauer:** 35 Min.

Ausgangslage: Skill `add-focuslist-action`, Aktion `set-priority` mit Test, Lint und Tests grün, Chat im Agent-Modus. Die fünf Projektregeln stehen in `.github/copilot-instructions.md`.

1. Erstelle `.github/prompts/focuslist-code-review.prompt.md` wie oben.
2. Öffne `src/actions/set-priority.ts` (Python: `focuslist/actions/set_priority.py`), rufe `/focuslist-code-review` auf und prüfe, ob die Tabelle eine Zeile pro Regel enthält.
3. Erstelle `.github/prompts/add-missing-tests.prompt.md` mit `tools: ['read', 'search', 'edit', 'execute']`.
4. Rufe `/add-missing-tests aktion=set-priority` (Python: `aktion=set_priority`) auf. Notiere die gemeldeten Lücken und prüfe, ob mindestens einer dieser Fälle dabei ist:
   - Nach einem Fehler (z. B. ungültige Priorität) ist die gespeicherte Task unverändert.
   - Eine Priorität in Großbuchstaben (`HIGH`) wird abgelehnt.
5. Übernimm die neuen Tests mit **Keep** und führe `npm test` (Python: `uv run pytest`) aus.
6. Erstelle `.github/prompts/refactor-action.prompt.md` und rufe `/refactor-action aktion=complete-task` (Python: `aktion=complete_task`) auf.
7. Prüfe die Liste aus Schritt 3 des Prompts und den Diff: Wurde nur Struktur geändert? Sind Fehlermeldungen und Signaturen gleich geblieben? Übernimm mit **Keep**, wenn Lint und Tests grün sind, sonst **Undo**.
8. Wende `/focuslist-code-review` ein zweites Mal an, diesmal auf `complete-task`, und vergleiche die Tabelle mit der aus Schritt 2.

**Checkpoint:**

- `.github/prompts/` enthält `focuslist-code-review.prompt.md`, `add-missing-tests.prompt.md` und `refactor-action.prompt.md`.
- Die Review-Tabelle hat fünf Zeilen, eine pro Regel; für `set-priority` lautet jedes Ergebnis "eingehalten". Keine Datei wurde durch den Review geändert.
- Mindestens ein neuer Test für `set-priority`; Lint und Tests grün: `npm test` → `ℹ tests 12`, `ℹ pass 12`; `uv run pytest -q` → `12 passed`.
- Die Entscheidung Keep oder Undo zum Umbau ist mit einem Satz begründet.

<details>
<summary>Erwartete Ergebnisse im Detail</summary>

Review von `set-priority` (JS/TS):

```text
| Regel | Ergebnis | Fundstelle |
| --- | --- | --- |
| 1 Error statt null/undefined | eingehalten | Z. 6 (assertPriority), Z. 10 (throw) |
| 2 Dateizugriff nur über readTasks/writeTasks | eingehalten | Z. 7, Z. 13 |
| 3 Prioritäten über validation.ts prüfen | eingehalten | Z. 3, Z. 6 |
| 4 Test für Erfolgs- und Fehlerfall | eingehalten | tests/actions/set-priority.test.ts |
| 5 keine neuen Abhängigkeiten | eingehalten | nur Projekt-Importe |
```

Python: gleiches Ergebnis für Regel 1 bis 4; Regel 5 lautet dort "Type Hints an allen öffentlichen Funktionen. Keine neuen Abhängigkeiten". Meldet der Review "Regel 4 nicht prüfbar", hat `agent: ask` die Testdatei nicht geöffnet; "nicht relevant" ist dann korrekt.

Echte Testlücken in `set-priority`: Der vorhandene Test prüft nur, **dass** geworfen wird, nicht, dass vorher nichts gespeichert wurde; und er testet nur einen völlig fremden Wert (`urgent`), nicht `HIGH`. Mögliche neue Tests (JS/TS, Import von `listTasks` oben ergänzt):

```ts
test("lässt die gespeicherte Task bei ungültiger Priorität unverändert", () => {
  const task = addTask("Unverändert", "low");
  assert.throws(() => setPriority(task.id, "urgent"), /Ungültige Priorität/);
  assert.equal(listTasks()[0].priority, "low");
});

test("lehnt eine Priorität in Großbuchstaben ab", () => {
  const task = addTask("Großschreibung");
  assert.throws(() => setPriority(task.id, "HIGH"), /Ungültige Priorität/);
});
```

Beide laufen sofort grün: Sie decken keinen Fehler auf, sondern sichern bestehendes Verhalten gegen spätere Änderungen ab. Python analog mit `pytest.raises(ValueError, match="Ungültige Priorität")`.

Typischer Umbau von `complete-task`: Die Suche der Task per id samt Meldung "existiert nicht" steht doppelt in `complete-task` und `set-priority`. Copilot zieht sie in `findTaskOrThrow(tasks, id)` in `validation.ts` (Python: `find_task_or_raise` in `validation.py`). Keep, wenn Signatur, Fehlermeldung und Testdateien unverändert sind; Undo, wenn eine Meldung umformuliert, ein Test angepasst oder eine Abhängigkeit eingeführt wurde.

</details>

**Falls es hakt:**

- Fragt Copilot nach dem Wert für `aktion`, statt ihn aus dem Aufruf zu übernehmen: den Namen in der Antwort eintippen.
- Schlägt der Test-Prompt keinen der beiden Fälle aus Schritt 4 vor: im selben Chat nachfordern: "Ergänze auch einen Test, der prüft, dass die gespeicherte Task nach einem Fehler unverändert ist."
- Fehlen Prompt-Dateien oder ist der Stand kaputt: die drei Dateien aus `steps/m06/.github/prompts/` übernehmen.

**Gegenprobe (optional):** Im Review-Prompt `agent: ask` in `agent: agent` ändern und "Ändere selbst keine Datei." entfernen, dann auf eine Kopie von `complete-task` mit `return null` statt `throw` anwenden. Copilot ersetzt das `return null` meist direkt, statt es nur zu melden. Danach die ursprüngliche Fassung wiederherstellen.

### Was sich in der Referenz geändert hat

v3 gegenüber v2 (nur der Teil aus diesem Thema):

| Datei | Änderung |
| --- | --- |
| `.github/prompts/focuslist-code-review.prompt.md` | neu, wie oben |
| `.github/prompts/add-missing-tests.prompt.md` | neu, `tools: ['read', 'search', 'edit', 'execute']` |
| `.github/prompts/refactor-action.prompt.md` | neu, wie oben |
| `tests/actions/set-priority.test.ts` · `test_set_priority.py` | zwei Tests ergänzt: "unverändert nach Fehler", "`HIGH` wird abgelehnt" |
| `src/actions/*` | unverändert: Die Referenz behält die Fassung ohne `findTaskOrThrow`; ein übernommener Umbau stört in den folgenden Modulen nicht |

## Fazit

- Review, Tests und Refactoring sind drei getrennte Prompt-Dateien mit unterschiedlichen Rechten.
- Der Review-Prompt prüft Regel für Regel gegen `copilot-instructions.md` und ändert nichts.
- Test- und Refactoring-Prompt nennen erst die Lücke bzw. den Umbau und prüfen am Ende mit den Tests.

Als Nächstes zieht ein weiterer Prompt die Doku nach: [Doku mit KI](./03-doku-mit-ki.md).
