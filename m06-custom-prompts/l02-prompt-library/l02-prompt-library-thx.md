# Lab 6.2: Prompt-Bibliothek für FocusList aufbauen

Ziel: eine kleine Bibliothek aus Review-, Test- und Refactoring-Prompts für FocusList bauen, die v2 auf v3 vorbereitet.

**Leitfragen:**

<details>
<summary>Warum lohnt sich eine Bibliothek statt eines einzelnen Prompts?</summary>

Weil Review, Testergänzung und Refactoring unterschiedliche, wiederkehrende Aufgaben mit unterschiedlichem Ziel sind — ein einzelner Prompt könnte das nicht sauber trennen.

</details>

<details>
<summary>Worauf sollte `focuslist-code-review.prompt.md` konkret Bezug nehmen?</summary>

Auf die Regeln aus `copilot-instructions.md`, damit der Review-Prompt tatsächlich gegen die projektspezifischen Konventionen prüft, nicht nur generisch.

</details>

<details>
<summary>Was ist der Zweck von `add-missing-tests.prompt.md`?</summary>

Fehlende Testfälle (insbesondere Grenzfälle) für eine referenzierte Datei gezielt identifizieren und ergänzen zu lassen.

</details>

## Begriffe & Mentales Modell

- **Prompt-Bibliothek:** eine Sammlung mehrerer, klar abgegrenzter `*.prompt.md`-Dateien für unterschiedliche wiederkehrende Aufgaben.
- **Review-Prompt:** prüft bestehenden Code gegen definierte Konventionen, ohne ihn selbst zu ändern.

## Die drei Prompts im Überblick

- `focuslist-code-review.prompt.md`: prüft gegen `copilot-instructions.md`, listet Abweichungen.
- `add-missing-tests.prompt.md`: identifiziert und ergänzt fehlende Testfälle.
- Ein dritter, freier Refactoring-Prompt nach Wahl der Gruppe (z. B. "vereinheitliche Namenskonventionen").

## Beispiel

`focuslist-code-review.prompt.md`, angewendet auf `set-priority.ts` aus Modul 5, listet z. B. "Regel 2 eingehalten, Regel 3 (Signatur-Konvention) nicht vollständig erfüllt" als konkretes Ergebnis.

**Erwartetes Ergebnis:** der Review-Prompt liefert eine konkrete, gegen die Regeln geprüfte Liste, keine allgemeine Einschätzung.

## Grenzen

Ein Review-Prompt ersetzt kein menschliches Review — er beschleunigt es, indem er offensichtliche Abweichungen vorab auflistet.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du benennen, welcher der drei Prompts für welchen Zweck gedacht ist? Die Übung baut alle drei tatsächlich für FocusList.
