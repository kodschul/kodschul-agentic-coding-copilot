# Lab 2.1 – Lösung

## Aufgabe 1 & 2: Vorschlag ohne vs. mit Kommentar

Ohne Kommentar liefert Copilot bei einer leeren `validateEmail(...)`-Funktion oft nur eine sehr einfache Prüfung (z. B. nur `includes("@")`). Mit einem präzisen Kommentar wie `// prüft, ob ein String ein gültiges E-Mail-Format hat (RFC-vereinfachte Regex)` liefert Copilot typischerweise eine Regex-basierte, robustere Prüfung.

## Aufgabe 3: Unterschied

Der Kommentar liefert dem Modell zusätzlichen Kontext über die erwartete Prüfmethode (Regex) und den Anspruch ("RFC-vereinfacht") — das grenzt den Lösungsraum ein und erhöht die Trefferqualität.

## Aufgabe 4: Alternative Vorschläge

Beim Durchblättern alternativer Vorschläge zeigen sich oft unterschiedliche Implementierungsansätze (z. B. Regex vs. eine Hilfsbibliothek) — die Wahl hängt vom Projektkontext ab, nicht davon, welcher Vorschlag zuerst erscheint.
