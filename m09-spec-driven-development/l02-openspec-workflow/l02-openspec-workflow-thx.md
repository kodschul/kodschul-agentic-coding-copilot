# Lab 9.2: FocusList-Feature mit OpenSpec umsetzen

Ziel: das FocusList-Feature "Aufgaben nach Fälligkeitsdatum sortieren" zuerst als OpenSpec-Spezifikation schreiben, dann implementieren lassen, und damit v6 auf v7 (finale Version) heben.

**Leitfragen:**

<details>
<summary>Warum gerade "nach Fälligkeitsdatum sortieren" als Beispiel für Spec-Driven Dev?</summary>

Weil hier ein nicht-trivialer Randfall existiert (Aufgaben ohne Fälligkeitsdatum), der eine Spec vor der Implementierung klären muss.

</details>

<details>
<summary>Was zeigt das OpenSpec-Dashboard konkret?</summary>

Den Status verschiedener Specs (proposed, in progress, archived) — sichtbar am Beispiel der drei mitgelieferten FocusList-Specs.

</details>

<details>
<summary>Wird diese Spec sofort archiviert?</summary>

Ja — sie ist die einzige der drei Beispiel-Specs, die in diesem Lab tatsächlich bis zur Implementierung durchläuft und danach archiviert wird.

</details>

## Begriffe & Mentales Modell

- **`openspec/archive/sort-by-due-date/`:** Zielort dieser Spec nach abgeschlossener Implementierung.
- **v6 → v7:** letzte Versionsstufe des Kurses, erreicht durch den vollständigen Spec-First-Durchlauf.

## Ablauf in diesem Lab

1. Proposal + Spec für "nach Fälligkeitsdatum sortieren" schreiben (inkl. Umgang mit fehlendem Datum).
2. Spec reviewen (Randfall explizit klären).
3. Implementierung aus der Spec generieren lassen.
4. Spec nach erfolgreicher Implementierung archivieren.

## Beispiel

Die Spec legt fest: "Aufgaben ohne Fälligkeitsdatum erscheinen am Ende der sortierten Liste." Die generierte Implementierung von `sort-by-due-date.ts` behandelt genau diesen Fall wie spezifiziert.

**Erwartetes Ergebnis:** eine Testliste mit gemischten Aufgaben (mit/ohne Datum) wird korrekt sortiert, Aufgaben ohne Datum stehen am Ende.

## Grenzen

Dieses Lab durchläuft nur eine der drei im Projektskelett vorgesehenen Specs vollständig — die anderen beiden (`recurring-tasks`, `bulk-complete-tasks`) bleiben bewusst in früheren Dashboard-Stadien, um den Fortschritt im Dashboard sichtbar zu machen.

## Checkpoint & Brücke zur Übung

Checkpoint: Behandelt deine Implementierung den Randfall "kein Fälligkeitsdatum" korrekt? Die Übung führt den vollständigen Spec-First-Durchlauf durch.
