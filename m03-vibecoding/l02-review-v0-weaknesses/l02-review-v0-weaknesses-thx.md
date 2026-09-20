# Lab 3.2: Ergebnis systematisch analysieren

Ziel: die entstandenen Schwächen von FocusList v0 (Stilinkonsistenz, falsche Annahmen, fehlender Kontext, Halluzinationen) systematisch identifizieren und priorisiert dokumentieren.

**Leitfragen:**

<details>
<summary>Warum wird hier nur analysiert und noch nicht gefixt?</summary>

Weil vorschnelles Fixen echtes Verständnis der Ursachen verhindert — die gezielte Behebung ist Inhalt von Modul 4 mit `copilot-instructions.md`.

</details>

<details>
<summary>Was zählt als "falsche Annahme" im Gegensatz zu einem reinen Stilproblem?</summary>

Eine falsche Annahme betrifft fachliche Korrektheit (z. B. angenommene Feldnamen, die nicht zum Konzeptdokument passen), ein Stilproblem betrifft nur Konsistenz der Schreibweise/Struktur.

</details>

<details>
<summary>Wie findet man Halluzinationen in bereits laufendem Code?</summary>

Durch gezieltes Nachschlagen genutzter APIs/Bibliotheken gegen die tatsächliche Dokumentation oder tatsächlich installierte Version.

</details>

## Begriffe & Mentales Modell

- **Stilinkonsistenz:** unterschiedliche Schreibweisen/Strukturen für vergleichbare Fälle innerhalb desselben Projekts.
- **Falsche Annahme:** eine vom Modell getroffene, unbegründete fachliche Entscheidung, die nicht im Konzeptdokument steht.
- **Halluzination:** eine genutzte Funktion/API, die so nicht existiert oder nicht wie angenommen funktioniert.

## Analyse-Dimensionen für v0

- Stil: Benennung, Fehlerbehandlung, Struktur zwischen den drei Aktionen vergleichen.
- Annahmen: jede getroffene Default-Entscheidung (z. B. Default-Priorität) gegen das Konzeptdokument prüfen.
- Kontext: wurde eine bereits vorhandene Datei/Konvention ignoriert, weil sie nicht referenziert wurde?
- Halluzination: jede genutzte externe Funktion/API stichprobenartig verifizieren.

## Beispiel

`addTask` verwendet `crypto.randomUUID()` als ID-Generator. **Erwartetes Ergebnis der Prüfung:** diese Funktion existiert in aktuellen Node.js-Versionen tatsächlich (keine Halluzination) — aber ob sie mit der im Projekt tatsächlich verwendeten Node-Version kompatibel ist, muss trotzdem geprüft werden.

## Grenzen

Nicht jede gefundene Schwäche muss in Modul 4 behoben werden — die Priorisierung in diesem Lab entscheidet, was zuerst angegangen wird.

## Checkpoint & Brücke zur Übung

Checkpoint: Liegt eine priorisierte Liste konkreter Schwächen vor (nicht nur ein pauschales "unsauber")? Die Übung führt zu genau dieser Liste.
