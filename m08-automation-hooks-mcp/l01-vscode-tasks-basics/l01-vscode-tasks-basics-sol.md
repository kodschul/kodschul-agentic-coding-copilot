# Lab 8.1 – Lösung

## Aufgabe 1: `.vscode/tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lint + Test",
      "type": "shell",
      "command": "npm run lint && npm test",
      "problemMatcher": ["$eslint-stylish"]
    }
  ]
}
```

## Aufgabe 2 & 3: Ausführung und Fehlerdiagnose

Nach Ausführung über "Run Task" erscheint die kombinierte Lint+Test-Ausgabe im Terminal-Panel. Ein absichtlich eingebauter Lint-Fehler (z. B. eine ungenutzte Variable) erscheint dank `$eslint-stylish`-Problem-Matcher zusätzlich im Editor-Problems-Panel mit korrekter Zeilenangabe.

## Aufgabe 4: Nach Behebung

Nach Entfernen der ungenutzten Variable läuft die Task vollständig grün durch — beide Schritte (Lint, Test) sind erfolgreich.
