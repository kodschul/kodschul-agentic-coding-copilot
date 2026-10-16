# Lab 8.2: Hooks – Automatisierung bei Save/Commit

Ziel: FocusList-Tests automatisch vor jedem Commit ausführen lassen und damit v4 auf v5 heben.

**Leitfragen:**

<details>
<summary>Was ist der Unterschied zwischen einer Task und einem Hook?</summary>

Eine Task wird manuell angestoßen, ein Hook wird automatisch durch ein Ereignis (z. B. Commit) ausgelöst.

</details>

<details>
<summary>Warum Tests vor dem Commit statt nur in CI?</summary>

Ein Pre-Commit-Hook verhindert, dass fehlerhafter Code überhaupt erst ins Repository gelangt, statt den Fehler erst später in der CI zu entdecken.

</details>

<details>
<summary>Kann ein Hook einen Commit blockieren?</summary>

Ja — ein Pre-Commit-Hook mit nicht-null Exit-Code verhindert den Commit, bis der Fehler behoben ist.

</details>

## Begriffe & Mentales Modell

- **Hook:** ein Skript, das automatisch bei einem Git-Ereignis (z. B. `pre-commit`) ausgeführt wird.
- **Blockierender Hook:** verhindert den Commit bei Fehlschlag, statt nur zu warnen.

## Aufbau des Hooks

- `pre-commit`: führt die Testsuite aus, bevor der Commit abgeschlossen wird.
- Bei Fehlschlag: Commit wird abgebrochen, Fehlermeldung angezeigt.

## Beispiel

Ein Entwickler versucht, mit einem absichtlich kaputten Test zu committen. Der Pre-Commit-Hook führt die Tests aus, erkennt den Fehlschlag und bricht den Commit ab, bevor er ins Repository gelangt.

**Erwartetes Ergebnis:** `git commit` schlägt fehl und zeigt die Testausgabe, solange der Test nicht behoben ist.

## Grenzen

Ein lokaler Hook kann umgangen werden (z. B. `--no-verify`) — er ersetzt keine serverseitige CI-Absicherung.

## Checkpoint & Brücke zur Übung

Checkpoint: Blockiert dein Hook einen Commit bei fehlschlagendem Test tatsächlich? Die Übung testet das konkret an FocusList.
