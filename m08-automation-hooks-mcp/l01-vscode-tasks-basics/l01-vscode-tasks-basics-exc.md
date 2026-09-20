# Lab 8.1 – Übung: Lint + Test als Task einrichten

**Ändert die FocusList-Projektbasis?** Nein — generische Übung an einem Fremdprojekt.

## Ausgangslage

`sample-project/` mit vorhandenen Lint- und Test-Skripten in `package.json`.

## Aufgaben

1. Erstelle `.vscode/tasks.json` mit einer Task "Lint + Test", die Lint und Test nacheinander ausführt.
2. Führe die Task über die Command Palette aus und prüfe die Ausgabe.
3. Baue absichtlich einen Lint-Fehler ein und führe die Task erneut aus — prüfe, ob der Fehler im Problems-Panel erscheint.
4. Behebe den Fehler und bestätige, dass die Task danach vollständig grün durchläuft.

## Checkpoint

- Die Task existiert in `.vscode/tasks.json` und führt beide Schritte (Lint, Test) nacheinander aus.
- Der absichtlich eingebaute Fehler aus Aufgabe 3 ist im Problems-Panel sichtbar.

## Abschlusskriterien

- Die Task läuft nach Behebung des Fehlers vollständig grün durch.

## Fallback

Falls kein Problem Matcher konfiguriert ist und Fehler nicht im Panel erscheinen: die Rohausgabe im Terminal-Tab der Task auf den Fehler hin prüfen und das Fehlen des Problem Matchers als Beobachtung festhalten.
