# Lab 9.1: Warum erst Spec, dann Code?

Ziel: das Prinzip von Spec-Driven Development erklären können und begründen, wann es sich gegenüber direktem Code-First lohnt.

**Leitfragen:**

<details>
<summary>Was ist der Kernunterschied zwischen Code-First und Spec-Driven Development?</summary>

Bei Spec-Driven Development wird zuerst eine überprüfbare Spezifikation geschrieben und freigegeben, bevor überhaupt Code generiert wird — bei Code-First entsteht die Spezifikation höchstens nachträglich, wenn überhaupt.

</details>

<details>
<summary>Warum lohnt sich das gerade bei komplexeren, mehrstufigen Features?</summary>

Weil eine Spec Missverständnisse und fehlende Randfälle sichtbar macht, bevor Zeit in fehlerhaften Code investiert wird.

</details>

<details>
<summary>Ist Spec-Driven Development für jede Änderung sinnvoll?</summary>

Nein — für triviale, eindeutige Änderungen ist der Spec-Aufwand oft unnötig; es lohnt sich vor allem bei mehrdeutigen oder folgenreichen Features.

</details>

## Begriffe & Mentales Modell

- **Spec-Driven Development:** Workflow, bei dem eine Spezifikation (Proposal + Spec) vor der Implementierung geschrieben und geprüft wird.
- **OpenSpec:** Werkzeug/Konvention, die Specs in `openspec/changes/`, `openspec/in-progress/` und `openspec/archive/` mit Status-Dashboard verwaltet.

## Ablauf im Überblick

1. Proposal: Problem und Ziel kurz beschreiben.
2. Spec: konkrete Anforderungen, Schnittstellen, Randfälle festhalten.
3. Review/Freigabe der Spec.
4. Erst danach: Code aus der Spec generieren lassen.

## Beispiel

Ein Feature "Aufgaben nach Fälligkeitsdatum sortieren" wirkt trivial, bis die Spec die Frage aufwirft: "Was passiert mit Aufgaben ohne Fälligkeitsdatum?" — diese Frage wäre bei direktem Code-First vermutlich erst nach der Implementierung aufgefallen.

**Erwartetes Ergebnis:** die Spec-Phase deckt mindestens einen Randfall auf, der bei einer spontanen Code-First-Anfrage wahrscheinlich übersehen worden wäre.

## Grenzen

Eine Spec ersetzt kein Review des generierten Codes — sie reduziert nur die Wahrscheinlichkeit grundlegender Missverständnisse.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du einen Randfall nennen, den eine Spec vor der Implementierung sichtbar machen würde? Die Übung schreibt eine erste Spec für ein Fremdbeispiel.
