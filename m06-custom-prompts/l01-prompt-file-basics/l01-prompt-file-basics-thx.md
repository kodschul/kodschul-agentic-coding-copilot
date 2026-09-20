# Lab 6.1: Aufbau einer `*.prompt.md`-Datei

Ziel: eine `*.prompt.md`-Datei mit Variablen, Ziel und Ablauf schreiben und über die Prompt-Palette gezielt aufrufen können.

**Leitfragen:**

<details>
<summary>Was unterscheidet einen Custom Prompt von einer normalen Chat-Frage?</summary>

Ein Custom Prompt ist eine wiederverwendbare, gespeicherte Anfrage mit festem Ablauf, die per Name aufgerufen wird, statt jedes Mal neu formuliert zu werden.

</details>

<details>
<summary>Wofür stehen Variablen in einer Prompt-Datei?</summary>

Sie machen den Prompt für unterschiedliche konkrete Eingaben wiederverwendbar (z. B. eine Datei- oder Funktionsreferenz, die bei jedem Aufruf variiert).

</details>

<details>
<summary>Ersetzt ein Custom Prompt eine Skill?</summary>

Nein — ein Prompt ist meist kürzer und für eine einzelne wiederkehrende Anfrage gedacht, eine Skill für einen mehrstufigen Ablauf.

</details>

## Begriffe & Mentales Modell

- **`*.prompt.md`:** eine gespeicherte, wiederverwendbare Prompt-Vorlage mit Frontmatter (Ziel, Modus) und Ablauftext.
- **Variable:** ein Platzhalter im Prompt, der beim Aufruf durch konkreten Kontext ersetzt wird (z. B. die aktuell offene Datei).

## Aufbau einer Prompt-Datei

- Frontmatter: Kurzbeschreibung, ggf. erlaubte Tools/Modus.
- Ablauftext: klare, wiederholbare Anweisung mit Platz für variablen Kontext.

## Beispiel

Ein Prompt `explain-selection.prompt.md` fasst "Erkläre die aktuelle Selektion in 3 Sätzen, nenne mindestens einen Risikofall" zusammen. Statt das jedes Mal neu zu tippen, wird der Prompt per Name aufgerufen.

**Erwartetes Ergebnis:** zwei Aufrufe desselben Prompts auf unterschiedlichem Code liefern strukturell gleichartige Antworten (3 Sätze + ein Risikofall), nur inhaltlich unterschiedlich.

## Grenzen

Ein Prompt beeinflusst nur die konkrete Anfrage, bei der er aufgerufen wird — im Gegensatz zu Instructions gilt er nicht automatisch im Hintergrund.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du den Unterschied zwischen Prompt-Aufruf und einer freien Chat-Frage in einem Satz erklären? Die Übung schreibt und testet einen ersten eigenen Prompt.
