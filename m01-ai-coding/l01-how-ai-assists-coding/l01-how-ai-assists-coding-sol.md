# Lab 1.1 – Lösung

## Aufgabe 1: Prüfpunkte je Snippet

Beispielhafte Prüfpunkte (variieren je nach konkretem Beispielset, aber jeder Punkt muss konkret und benennbar sein — kein pauschales Urteil):

- **Snippet 1 (Datei-Upload-Handler):** fehlende Validierung der Dateigröße und des MIME-Typs — ein Angreifer könnte eine überdimensionierte oder falsch deklarierte Datei hochladen.
- **Snippet 2 (Preisberechnung):** Rundungsverhalten bei Fließkommazahlen — klassische Quelle stiller Rechenfehler (z. B. `0.1 + 0.2 !== 0.3`).
- **Snippet 3 (Auth-Check):** prüfen, ob der Check wirklich vor JEDEM relevanten Codepfad greift, nicht nur im Haupt-Happy-Path (z. B. fehlt der Check bei einem alternativen Einstiegspunkt).

## Aufgabe 2 & 3: Testeingabe für Snippet 2

Beispiel: Preisberechnung mit zwei Werten, die zu bekannten Fließkomma-Rundungsproblemen führen (z. B. `0.1 + 0.2`). Erwartetes Verhalten: korrektes Runden auf zwei Nachkommastellen. Tatsächliches Verhalten (falls das Snippet naiv `+` nutzt ohne Rundung): ein Ergebnis wie `0.30000000000000004` statt `0.30`.

## Aufgabe 4: Verantwortung

Die Verantwortung liegt bei der Person, die den Code reviewt und committet — unabhängig davon, ob ein Mensch oder eine AI ihn ursprünglich vorgeschlagen hat. "AI hat das geschrieben" verschiebt weder die rechtliche noch die fachliche Verantwortung.
