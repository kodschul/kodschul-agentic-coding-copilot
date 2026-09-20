# Lab 5.1: Was ist eine Skill und wann lohnt sie sich?

Ziel: den Unterschied zwischen `SKILL.md` und `copilot-instructions.md` erklären und begründen können, wann eine Skill die bessere Wahl ist.

**Leitfragen:**

<details>
<summary>Warum reicht `copilot-instructions.md` nicht für jede wiederkehrende Aufgabe?</summary>

Instructions gelten immer und pauschal; eine Skill wird gezielt nur dann aktiv genutzt, wenn eine bestimmte, wiederkehrende Aufgabenart ansteht (z. B. "neue Aktion hinzufügen").

</details>

<details>
<summary>Was steht typischerweise in einer `SKILL.md`, das in Instructions fehlt?</summary>

Ein konkreter, mehrstufiger Ablauf (Schritt 1, Schritt 2, ...) für eine bestimmte wiederkehrende Aufgabe, statt allgemeiner Dauerregeln.

</details>

<details>
<summary>Kann man Instructions und Skills gleichzeitig nutzen?</summary>

Ja — Instructions gelten immer im Hintergrund, eine Skill wird zusätzlich für die konkrete Aufgabe herangezogen, für die sie geschrieben wurde.

</details>

## Begriffe & Mentales Modell

- **`SKILL.md`:** ein wiederverwendbarer, mehrstufiger Ablauf für eine konkrete, wiederkehrende Aufgabenart.
- **Instructions vs. Skill:** Instructions = Dauerregeln fürs ganze Repo; Skill = Rezept für eine bestimmte Aufgabe.

## Wann eine Skill sich lohnt

- Die Aufgabe wiederholt sich (z. B. "neue Aktion hinzufügen" kommt in jedem Sprint mehrfach vor).
- Die Aufgabe hat mehrere, in fester Reihenfolge sinnvolle Schritte.
- Ohne Skill würde jedes Mal dieselbe Erklärung im Chat neu formuliert werden müssen.

## Beispiel

Eine wiederkehrende Aufgabe "REST-Endpoint nach Schema anlegen" wird ohne Skill jedes Mal unterschiedlich strukturiert umgesetzt (mal mit, mal ohne Validierungsschicht). Mit einer Skill, die die Schritte "Schema → Route → Validierung → Test" vorgibt, wird die Struktur zuverlässig wiederholt.

**Erwartetes Ergebnis:** zwei mit derselben Skill erzeugte Endpoints folgen sichtbar derselben Struktur, zwei ohne Skill erzeugte nicht.

## Grenzen

Eine Skill lohnt sich nicht für Einmalaufgaben — der Pflegeaufwand für die Skill-Datei übersteigt dann den Nutzen.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du ein Kriterium nennen, wann eine Aufgabe eine eigene Skill rechtfertigt? Die Übung prüft das an einer Fremdaufgabe.
