# LLM-Grundlagen: Tokens, Context Window, RAG

LLMs verarbeiten keinen Text, sondern Tokens — dieses Wissen erklärt, warum Copilot manchmal "vergisst" oder Kosten pro Anfrage schwanken.

## Tokens

| Begriff | Bedeutung |
| --- | --- |
| Token | kleinste Verarbeitungseinheit, oft ein Wortteil, keine ganze Wort-1:1-Entsprechung |
| Tokenisierung | Zerlegung von Text in Tokens vor der Modellverarbeitung |

- Ein deutsches Wort sind oft 1-3 Tokens, Code (Klammern, Operatoren) tokenisiert dichter als Fließtext.
- Anfragekosten und Kontextlimits werden in Tokens gemessen, nicht in Zeichen oder Wörtern.

## Context Window

```
[System-Prompt] [Instructions] [offene Dateien] [Chatverlauf] [Anfrage]
└──────────────── Context Window (begrenzte Tokenanzahl) ────────────────┘
```

- Alles zusammen muss in das Context Window passen; überschreitet es das Limit, fällt älterer Inhalt weg oder die Anfrage wird abgelehnt.
- Ein größeres Context Window erlaubt mehr Dateien gleichzeitig, ersetzt aber keine gezielte Auswahl (siehe Lab 1.1).

> **Merksatz:** Context Window ist ein Budget, kein unbegrenzter Speicher — jede zusätzliche Datei kostet Platz für etwas anderes.

## RAG (Retrieval-Augmented Generation)

| Schritt | Was passiert |
| --- | --- |
| Retrieval | relevante Textausschnitte werden aus einer Wissensquelle gesucht (z. B. Codebase-Index) |
| Augmentation | gefundene Ausschnitte werden dem Prompt als zusätzlicher Kontext hinzugefügt |
| Generation | das Modell antwortet auf Basis von Anfrage + eingefügtem Kontext |

- Copilots `@workspace`/Codebase-Suche funktioniert nach diesem Prinzip: relevante Dateien werden gesucht und in den Kontext eingespeist, statt das ganze Repository zu übergeben.
- RAG reduziert Halluzinationen, weil das Modell auf echten Projektinhalt statt auf reine Trainingsdaten zugreift — garantiert aber keine perfekte Trefferquote.

Angewendet in Lab 1.1.
