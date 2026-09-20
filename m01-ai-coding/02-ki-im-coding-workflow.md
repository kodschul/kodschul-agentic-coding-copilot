# KI im Coding-Workflow

Copilot ist an mehr Stellen im Entwicklungsprozess einsetzbar als nur "Code schreiben" — dieser Überblick ordnet die fünf typischen Einsatzpunkte.

## Fünf Einsatzpunkte

| Phase | Typische Nutzung | Beispiel-Command |
| --- | --- | --- |
| Planen | Aufgabe in Teilschritte zerlegen lassen | Chat: "Wie gehe ich diese Änderung an?" |
| Schreiben | Code/Funktion aus Beschreibung generieren | Inline-Vorschlag, Chat |
| Analysieren | bestehenden Code erklären lassen | `/explain` |
| Refactoren | Struktur verbessern ohne Verhalten zu ändern | `/fix`, gezielter Chat-Auftrag |
| Testen | Tests generieren oder Fehlschläge diagnostizieren | `/tests` |

```
Planen → Schreiben → Analysieren → Refactoren → Testen
   ↑___________________________________________|
        (iterativ, kein linearer Einmal-Durchlauf)
```

- Der Zyklus ist iterativ: ein generierter Test kann eine Refactoring-Runde auslösen, ein Refactoring kann neue Tests nötig machen.
- Nicht jede Phase braucht denselben Interaktionsmodus — Planen/Analysieren passiert meist im Chat, Schreiben/Refactoren oft inline.

> **Merksatz:** Copilot ist ein Werkzeug für jede Phase, nicht nur für's Tippen — wer es nur zum Schreiben nutzt, lässt Potenzial liegen.

## Grenze

Copilot kennt den Gesamtplan eines Projekts nicht automatisch — ohne Kontext (Instructions, referenzierte Dateien) bleibt jede Phase auf die aktuelle Anfrage beschränkt.

Angewendet in Lab 1.1 und vertieft in Modul 4 (Instructions).
