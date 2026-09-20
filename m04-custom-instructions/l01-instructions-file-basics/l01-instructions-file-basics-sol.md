# Lab 4.1 – Lösung

## Aufgabe 1: Ohne Instructions

Typisches Ergebnis: die Funktion gibt bei ungültiger Eingabe z. B. `undefined` zurück oder wirft implizit eine generische Exception — je nach Formulierung der Anfrage inkonsistent.

## Aufgabe 2: Instructions-Datei (Regel A)

```markdown
---
applyTo: "**/*.ts"
---

Funktionen werfen bei ungültiger Eingabe immer eine `Error` mit einer
sprechenden Meldung. Sie geben niemals `null` oder `undefined` als
Fehlersignal zurück.
```

## Aufgabe 3: Mit Regel A

Das Ergebnis wirft jetzt sichtbar eine `Error` statt `null`/`undefined` zurückzugeben — die Instructions-Datei hat das Verhalten wie vorgegeben beeinflusst.

## Aufgabe 4: Regel B (Gegenteil) und Grenzen

Nach Umkehrung der Regel auf "gibt bei Fehler `null` zurück" folgt das Modell in den meisten Fällen auch dieser neuen Regel — das zeigt, dass Instructions tatsächlich aktiv gelesen und nicht nur zufällig getroffen werden. Vereinzelt kann es trotzdem zu Abweichungen kommen, besonders bei mehrdeutig formulierten Anfragen — das ist die praktische Grenze von Instructions, keine Garantie.
