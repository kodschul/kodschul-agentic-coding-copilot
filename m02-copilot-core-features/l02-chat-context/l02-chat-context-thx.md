# Lab 2.2: Chat-Kontext richtig nutzen

Ziel: gezielt steuern können, welchen Kontext Copilot Chat für eine Antwort sieht, statt sich auf implizites Raten zu verlassen.

**Leitfragen:**

<details>
<summary>Sieht Copilot Chat automatisch mein ganzes Projekt?</summary>

Nein — standardmäßig nur offene Editoren/Selektion, sofern nicht explizit mehr Kontext referenziert wird.

</details>

<details>
<summary>Was macht `#file` konkret anders als eine einfache Frage ohne Referenz?</summary>

`#file` bindet den Inhalt einer bestimmten Datei explizit in den Kontext ein, unabhängig davon, ob sie gerade geöffnet ist.

</details>

<details>
<summary>Warum kann zu viel referenzierter Kontext die Antwortqualität verschlechtern?</summary>

Irrelevanter Kontext verdünnt das Signal für das Modell und kann zu ungenaueren oder allgemeineren Antworten führen.

</details>

## Begriffe & Mentales Modell

- **`#file`:** referenziert den Inhalt einer bestimmten Datei explizit im Chat.
- **`#selection`:** referenziert nur den aktuell markierten Codeabschnitt.
- **Workspace-Kontext:** implizit verfügbarer Kontext aus offenen Editoren, je nach Client-Konfiguration.

## Wann welche Referenz sinnvoll ist

- `#selection`: für eine gezielte Frage zu einem kleinen, bekannten Abschnitt.
- `#file`: wenn die relevante Datei nicht offen ist oder eindeutig referenziert werden muss.
- Mehrere `#file`-Referenzen: wenn eine Antwort echten Bezug zwischen zwei Dateien braucht (z. B. Interface + Implementierung).

## Beispiel

Frage "Wie sollte diese Funktion aussehen?" ohne Referenz liefert eine generische Antwort. Dieselbe Frage mit `#file:task.ts` liefert eine Antwort, die tatsächlich auf das existierende `Task`-Interface Bezug nimmt.

**Erwartetes Ergebnis:** die referenzierte Antwort nennt konkrete Feldnamen aus `task.ts`, die generische Antwort erfindet eigene.

## Grenzen

- Zu viele gleichzeitig referenzierte Dateien können die Antwort unschärfer statt präziser machen.
- Referenzen ersetzen keine klare Frage — unklare Fragen bleiben auch mit gutem Kontext unklar beantwortet.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du erklären, wann `#file` gegenüber `#selection` die bessere Wahl ist? Die Übung prüft das an einem konkreten Vergleich.
