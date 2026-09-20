# Lab 7.1 – Lösung

## Aufgabe 1: `.github/agents/explain-only.agent.md`

```markdown
---
name: explain-only
description: Erklärt Code ausschließlich, ändert nie Dateien.
tools: ["read_file", "grep_search", "semantic_search"]
---

Du erklärst ausschließlich Code auf Nachfrage, in klaren, kurzen Sätzen.
Du änderst niemals Dateien, auch nicht auf explizite Aufforderung.
Weise stattdessen darauf hin, dass Änderungen außerhalb deiner Rolle liegen.
```

## Aufgabe 2 & 3: Verhalten

Bei einer Erklärungsanfrage liefert der Agent eine korrekte Beschreibung. Bei einer Änderungsanfrage antwortet er sinngemäß: "Das liegt außerhalb meiner Rolle als Explain-only-Agent — ich kann die Änderung beschreiben, aber nicht selbst vornehmen."

## Aufgabe 4: Vergleich mit Chat-Modus

Ein normaler Chat-Modus mit vollem Werkzeugzugriff würde dieselbe Änderungsanfrage direkt umsetzen — der Unterschied liegt in der bewussten Tool-Einschränkung, nicht in der Fähigkeit des zugrunde liegenden Modells.
