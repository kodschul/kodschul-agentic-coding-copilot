# Lab 4.1: Aufbau und Wirkweise von `copilot-instructions.md`

Ziel: verstehen, wie `copilot-instructions.md` repoweite Regeln an jede Copilot-Anfrage anhängt, und den Unterschied zu keiner Instructions-Datei live erleben.

**Leitfragen:**

<details>
<summary>Wird `copilot-instructions.md` bei jeder Anfrage automatisch berücksichtigt?</summary>

Ja — sie wird implizit an jede Chat-/Agentic-Anfrage im Repo angehängt, ohne dass man sie referenzieren muss.

</details>

<details>
<summary>Was ist der Unterschied zwischen `copilot-instructions.md` und einer `*.instructions.md` mit `applyTo`?</summary>

`copilot-instructions.md` gilt global fürs ganze Repo; `*.instructions.md`-Dateien mit `applyTo`-Pattern gelten nur für passende Dateipfade.

</details>

<details>
<summary>Löst eine Instructions-Datei die in Lab 3.2 dokumentierten Schwächen automatisch?</summary>

Nein — sie senkt nur die Wahrscheinlichkeit neuer Inkonsistenzen bei künftigen Anfragen; bestehender Code muss weiterhin gezielt refactort werden.

</details>

## Begriffe & Mentales Modell

- **`copilot-instructions.md`:** liegt unter `.github/`, gilt repoweit, wird implizit in jeden Kontext eingemischt.
- **`applyTo`-Pattern:** grenzt eine `*.instructions.md`-Datei auf bestimmte Dateipfade ein (z. B. nur `**/*.test.ts`).

## Wirkweise im Vergleich

- Ohne Instructions: jede Anfrage startet stilistisch bei null, das Modell rät Konventionen.
- Mit Instructions: das Modell erhält feste Vorgaben (Naming, Fehlerbehandlung, Architektur), unabhängig von der einzelnen Anfrage.

## Beispiel

Dieselbe Anfrage "Implementiere eine neue Aktion X" liefert ohne Instructions ein anderes Fehlerbehandlungsmuster als das aus Lab 3.1 bekannte. Mit einer Instructions-Datei, die "Aktionen geben bei Fehlern `null` zurück, niemals eine Exception" vorschreibt, wird das Muster konsistent erzwungen.

**Erwartetes Ergebnis:** die Anfrage mit Instructions folgt sichtbar der vorgegebenen Regel, die Anfrage ohne Instructions nicht zuverlässig.

## Grenzen

- Instructions erzwingen keine Garantie — das Modell kann Regeln trotzdem gelegentlich ignorieren, besonders bei widersprüchlichen Anfragen.
- Zu lange oder zu vage Instructions verlieren an Wirkung.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du in einem Satz den Unterschied zwischen `copilot-instructions.md` und einer `applyTo`-beschränkten Instructions-Datei erklären? Die Übung testet die Wirkung live an einem Fremdbeispiel.
