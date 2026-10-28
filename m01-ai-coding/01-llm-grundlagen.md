# LLM-Grundlagen

Copilot basiert auf großen Sprachmodellen (LLMs). Wer weiß, wie ein LLM Text und Code erzeugt, versteht auch, warum Vorschläge mal treffen, mal danebenliegen.

## Leitfragen

<details>
<summary>Was ist ein LLM?</summary>

Ein Large Language Model ist ein neuronales Netz, das auf sehr großen Textmengen trainiert wurde, darunter öffentlicher Quellcode. Es sagt zu einem Eingabetext die wahrscheinlichste Fortsetzung voraus.

</details>

<details>
<summary>Wie funktioniert es?</summary>

Der Text wird in Tokens zerlegt. Das Modell berechnet Token für Token, welches nächste Token am plausibelsten ist, und hängt es an. Es gibt keine Datenbank mit "richtigen Antworten" und keine Ausführung des Codes.

</details>

<details>
<summary>Warum kann ein LLM überhaupt Code schreiben?</summary>

Code ist Text mit sehr strenger Struktur: feste Schlüsselwörter, wiederkehrende Muster, Millionen ähnlicher Beispiele im Trainingsmaterial. Dazu kommen Kommentare und Doku, die Absicht und Code verbinden. Genau solche Muster sagt ein LLM gut vorher.

</details>

<details>
<summary>Was kann ein LLM besonders gut, was besonders schlecht?</summary>

Gut: Boilerplate, bekannte Muster, Übersetzen zwischen Sprachen, Erklären, Varianten vorschlagen. Schlecht: Projektwissen, das nicht im Kontext steht, exakte Fakten zu Versionen und APIs, Randfälle, die niemand erwähnt, und alles, was nur zur Laufzeit sichtbar wird.

</details>

## Vom Text zur Vorhersage

```
Eingabe  →  Tokens  →  Modell sagt nächstes Token voraus  →  Token anhängen  →  wiederholen
```

- Das Modell "versteht" Code nicht wie ein Mensch: es sagt plausible nächste Tokens voraus, ohne Laufzeitverhalten oder Absicht zu kennen.
- Plausibel heißt nicht korrekt. Ein Vorschlag kann gut aussehen und trotzdem falsch sein.
- Dieselbe Anfrage liefert nicht immer dieselbe Antwort; LLM-Ausgaben sind nicht deterministisch.

## Tokens

| Begriff | Bedeutung |
| --- | --- |
| Token | kleinste Verarbeitungseinheit, oft ein Wortteil, keine 1:1-Entsprechung zu Wörtern |
| Tokenisierung | Zerlegung von Text in Tokens vor der Modellverarbeitung |

- Ein deutsches Wort sind oft 1–3 Tokens; Code (Klammern, Operatoren) tokenisiert dichter als Fließtext.
- Anfragekosten und Kontextlimits werden in Tokens gemessen, nicht in Zeichen oder Wörtern.

## Context Window

```
[System-Prompt] [Instructions] [offene Dateien] [Chatverlauf] [Anfrage]
└──────────────── Context Window (begrenzte Tokenanzahl) ────────────────┘
```

- Alles zusammen muss in das Context Window passen; überschreitet es das Limit, fällt älterer Inhalt weg oder die Anfrage wird abgelehnt.
- Ein größeres Context Window erlaubt mehr Dateien gleichzeitig, ersetzt aber keine gezielte Auswahl.

> **Merksatz:** Das Context Window ist ein Budget, kein unbegrenzter Speicher. Jede zusätzliche Datei kostet Platz für etwas anderes.

## Kontext steuert die Qualität

| Begriff | Bedeutung |
| --- | --- |
| Kontext | alles für die Anfrage Sichtbare: offene Editoren, Markierung, referenzierte Dateien, Instructions |
| Halluzination | plausibel aussehender, aber faktisch falscher Vorschlag, z. B. eine Funktion, die es nicht gibt |

```
kein Kontext          →  generischer Rate-Vorschlag
+ offene Datei        →  passt sich an Stil und Muster an
+ referenzierte Datei →  nutzt echte Feld- und Funktionsnamen
+ zu viele Tabs       →  Vorschlag wird wieder unschärfer
```

Beispiel-Anfrage: "Sortiere Aufgaben nach Priorität."

| Variante | Ergebnis |
| --- | --- |
| ohne Dateireferenz | erfindet plausible Feldnamen (`priority`, `prio`, `level`) |
| mit referenziertem `Task`-Interface | nutzt das tatsächlich vorhandene Feld |

- Halluzinationen entstehen, wenn das Modell ein plausibles Muster aus Trainingscode reproduziert, ohne zu prüfen, ob die API im aktuellen Projekt existiert.
- Gerade weil sie plausibel aussehen, sind sie gefährlich.

## RAG (Retrieval-Augmented Generation)

| Schritt | Was passiert |
| --- | --- |
| Retrieval | relevante Textausschnitte werden aus einer Wissensquelle gesucht (z. B. Codebase-Index) |
| Augmentation | gefundene Ausschnitte werden dem Prompt als zusätzlicher Kontext hinzugefügt |
| Generation | das Modell antwortet auf Basis von Anfrage + eingefügtem Kontext |

- Die Codebase-Suche von Copilot Chat (`#codebase`, Modul 2) funktioniert nach diesem Prinzip: relevante Stellen werden gesucht und in den Kontext eingespeist, statt das ganze Repository zu übergeben (Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context).
- RAG reduziert Halluzinationen, weil das Modell auf echten Projektinhalt statt auf reine Trainingsdaten zugreift, garantiert aber keine perfekte Trefferquote.

## Selbst ausprobieren

1. Öffne [`../project/sample-project/`](../project/sample-project/) (Python: [`../project/sample-project-python/`](../project/sample-project-python/)) in VS Code und schließe alle Editoren.
2. Frage im Copilot Chat: `Welche Felder hat ein Ticket in diesem Projekt?`
3. Öffne danach `src/models.ts` (Python: `sample/models.py`) und stelle dieselbe Frage in einem neuen Chat.

**Erwartete Beobachtung:** Ohne offene Datei bleibt die Antwort allgemein oder rät Felder; mit offener Modelldatei nennt sie `id`, `title`, `priority`, `status`, `createdAt` (Python: `created_at`) und das optionale `assignee`.

## Fazit

- Ein LLM sagt Tokens vorher; es weiß nichts über Laufzeitverhalten.
- Code liegt einem LLM, weil er aus strengen, oft wiederholten Mustern besteht.
- Kein Kontext → generischer Rateversuch; zu viel Kontext → unschärfer, nicht besser.

Weiter mit [02-ki-beim-programmieren.md](02-ki-beim-programmieren.md): wo genau ein LLM beim Programmieren hilft.
