# Lab 1.2: Ownership & Risiko bei AI-generiertem Code

Wer einen AI-Vorschlag committet, übernimmt die Verantwortung dafür — dieses Lab macht sichtbar, welche Risikoarten dabei konkret entstehen.

**Leitfragen:**

<details>
<summary>Wer haftet, wenn AI-generierter Code einen Schaden verursacht?</summary>

Wer den Code übernommen, reviewt und in Produktion gebracht hat — die Werkzeugwahl ändert nicht, wer verantwortlich ist.

</details>

<details>
<summary>Ist AI-generierter Code grundsätzlich unsicherer als von Hand geschriebener?</summary>

Nicht grundsätzlich, aber er kann unreflektiert riskante Muster reproduzieren, wenn niemand gezielt gegenprüft.

</details>

<details>
<summary>Was bedeutet "Code-Ownership" im Team-Kontext?</summary>

Wer einen Commit erstellt oder freigibt, übernimmt fachliche Verantwortung dafür, unabhängig vom Ursprung des Vorschlags.

</details>

## Begriffe

| Begriff     | Bedeutung                                                                           |
| ----------- | ----------------------------------------------------------------------------------- |
| Ownership   | Verantwortung für Korrektheit, Wartbarkeit, Sicherheit eines Code-Bestandteils      |
| Risikoarten | funktionale Fehler, veraltete/unsichere Muster, Lizenzfragen, übersehene Edge Cases |

## Nützlich und riskant zugleich

| Seite    | Beispiel                                                   |
| -------- | ---------------------------------------------------------- |
| Nützlich | schnelles Boilerplate, Vorschläge für unbekannte APIs      |
| Riskant  | Vorschläge werden unter Zeitdruck oft ungeprüft übernommen |

> **Merksatz:** "AI hat das vorgeschlagen" ist im Review kein Argument, nur eine Herkunftsangabe.

## Beispiel

Ein Team übernimmt einen AI-generierten Verschlüsselungs-Schnipsel ungeprüft, weil er "funktioniert". Erst im Sicherheits-Review fällt das veraltete Verfahren auf.

**Erwartetes Ergebnis:** die Verantwortung liegt beim Team, das ungeprüft übernommen hat, nicht beim Modell.

## Fazit

- Ownership verschiebt sich nie auf das Werkzeug, nur die Fehlerquelle ändert sich.
- Reviews, Tests und Konventionen (Modul 4) fangen auf, was AI allein nicht garantiert.
- "Kommt oft so vor" ist kein Sicherheitsnachweis.

Weiter geht's in der Übung: eine konkrete Entscheidungssituation bewerten.
