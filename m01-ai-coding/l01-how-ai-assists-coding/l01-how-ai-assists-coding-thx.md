# Lab 1.1: Wie funktioniert AI-Unterstützung beim Programmieren?

Copilot sagt keine "richtige" Antwort voraus, sondern das statistisch plausibelste nächste Token — Ziel dieses Labs: verstehen, wie Kontext diese Vorhersage steuert und wo sie kippt.

**Leitfragen:**

<details>
<summary>Versteht Copilot meinen Code wie ein Mensch?</summary>

Nein. Es sagt plausible nächste Tokens voraus, basierend auf Trainingsdaten und Kontext — ohne Verständnis von Laufzeitverhalten oder Absicht.

</details>

<details>
<summary>Warum schlägt Copilot manchmal eine Funktion vor, die es gar nicht gibt?</summary>

Es reproduziert ein plausibles Muster aus Trainingscode, ohne zu prüfen, ob die API im aktuellen Projekt existiert.

</details>

<details>
<summary>Was beeinflusst die Qualität eines Vorschlags am meisten?</summary>

Der verfügbare Kontext: offene Dateien, Selektion, Projektstruktur, Instructions.

</details>

## Begriffe

| Begriff       | Bedeutung                                                                          |
| ------------- | ---------------------------------------------------------------------------------- |
| LLM           | Modell, das Text (inkl. Code) tokenweise vorhersagt                                |
| Kontext       | alles für die Anfrage sichtbare: offene Editoren, Selektion, referenzierte Dateien |
| Halluzination | plausibel aussehender, aber faktisch falscher Vorschlag                            |

## Kontext steuert die Qualität

```
kein Kontext        →  generischer Rate-Vorschlag
+ offene Datei       →  passt sich an Stil/Muster an
+ referenzierte Datei →  nutzt echte Feld-/Funktionsnamen
+ zu viele Tabs       →  Vorschlag wird wieder unschärfer
```

> **Merksatz:** Mehr passender Kontext schärft den Vorschlag, mehr irrelevanter Kontext verwässert ihn wieder.

## Beispiel

Anfrage: "Sortiere Aufgaben nach Priorität."

| Variante                            | Ergebnis                                                   |
| ----------------------------------- | ---------------------------------------------------------- |
| ohne Dateireferenz                  | erfindet plausible Feldnamen (`priority`, `prio`, `level`) |
| mit referenziertem `Task`-Interface | nutzt das tatsächlich vorhandene Feld                      |

**Erwartetes Ergebnis:** beide Varianten nebeneinander machen die Kontextabhängigkeit sichtbar.

## Fazit

- Ein LLM sagt Tokens vorher, es "weiß" nichts über Laufzeitverhalten.
- Kein Kontext → generischer Rateversuch; zu viel Kontext → unschärfer, nicht besser.
- Halluzinationen sehen oft plausibel aus, das macht sie gefährlich, nicht harmlos.

Weiter geht's in der Übung: dieselbe Anfrage einmal mit, einmal ohne Kontext testen.
