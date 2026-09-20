# Lab 4.2: Eigene Coding-Konventionen für FocusList formulieren

Ziel: eine wirksame `copilot-instructions.md` für FocusList schreiben und damit v0 gezielt zu v1 refactoren, basierend auf der in Lab 3.2 erstellten Schwächenliste.

**Leitfragen:**

<details>
<summary>Sollte eine Instructions-Datei möglichst viele Regeln auf einmal enthalten?</summary>

Nein — wenige, konkrete und priorisierte Regeln wirken zuverlässiger als eine lange, vage Liste von "Best Practices".

</details>

<details>
<summary>Woher kommen die Regeln für FocusList konkret?</summary>

Direkt aus `v0-weaknesses.md` (Lab 3.2) — jede dort dokumentierte Schwäche wird zu einer expliziten Regel.

</details>

<details>
<summary>Muss v0 komplett neu geschrieben werden, um v1 zu erreichen?</summary>

Nein — v1 entsteht durch gezieltes Refactoring der in der Schwächenliste priorisierten "Muss"-Punkte, nicht durch einen Neubau.

</details>

## Begriffe & Mentales Modell

- **Explizite Regel:** eine Konvention, die konkret genug ist, um in einem Diff überprüfbar zu sein (z. B. "Aktionen werfen `Error`, nie `null`").
- **"Don'ts":** explizit verbotene Muster (z. B. "keine direkten `fs`-Zugriffe außerhalb von `storage/`").

## Von der Schwächenliste zur Instructions-Datei

- Jede "Muss"-Zeile aus `v0-weaknesses.md` wird zu genau einer Regel.
- Regeln werden so konkret formuliert, dass ein Reviewer sie an echtem Code prüfen kann.
- "Kann"-Punkte werden nur aufgenommen, wenn Zeit bleibt — Priorität liegt auf den Muss-Punkten.

## Beispiel

Aus der Schwächenliste: "Kein einheitliches Fehlerbehandlungsmuster." Wird zu: "Alle Aktionen in `src/actions/` werfen bei ungültiger Eingabe eine `Error`, geben niemals `null` oder `undefined` als Fehlersignal zurück."

**Erwartetes Ergebnis:** nach dem Refactoring werfen `add-task.ts`, `list-tasks.ts` und `complete-task.ts` konsistent Errors statt gemischter Rückgabewerte.

## Grenzen

Eine Instructions-Datei behebt nur künftige/refactorte Stellen zuverlässig — bereits bestehender Code muss weiterhin aktiv angestoßen werden, wie in diesem Lab.

## Checkpoint & Brücke zur Übung

Checkpoint: Liegt für jede "Muss"-Zeile aus `v0-weaknesses.md` eine konkrete Regel in `copilot-instructions.md` vor? Die Übung führt das FocusList-Refactoring v0 → v1 tatsächlich durch.
