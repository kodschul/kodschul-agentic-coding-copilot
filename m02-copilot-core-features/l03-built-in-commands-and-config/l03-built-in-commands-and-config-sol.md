# Lab 2.3 – Lösung

## Aufgabe 1: `/explain`

`/explain` beschreibt typischerweise nur, was der Code tut (z. B. "iteriert über das Array und gibt jedes Element aus"), ohne den Off-by-one-Fehler als Fehler zu benennen — Erklärung ist nicht dasselbe wie Fehlererkennung.

## Aufgabe 2: `/fix`

`/fix` erkennt die fehlerhafte Grenze meist nur, wenn eine sichtbare Warnung/Diagnose vorliegt (z. B. Linter-Hinweis). Bei einem rein logischen Off-by-one ohne Linter-Warnung liefert `/fix` möglicherweise gar keinen Vorschlag oder einen unpassenden.

## Aufgabe 3: `/tests`

Generierte Tests decken häufig den Hauptfall ab (normale Eingabe), aber nicht automatisch die Grenze (leeres Array, letzter Index) — dieser Grenzfall-Test muss meist manuell ergänzt werden.

## Aufgabe 4: Konfiguration

Typisches Beispiel: `"github.copilot.enable"` steuert, für welche Dateitypen Copilot aktiv ist; weitere Einstellungen betreffen z. B. Verzögerung der Inline-Vorschläge.

## Fazit

Keiner der drei Befehle ersetzt einen gezielten Blick auf Grenzfälle — sie beschleunigen den Workflow, ersetzen aber nicht das Review.
