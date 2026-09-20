# Lab 6.2 – Lösung

## Aufgabe 1: `focuslist-code-review.prompt.md`

```markdown
---
description: Prüft referenzierten Code gegen copilot-instructions.md und listet Abweichungen.
---

Prüfe die referenzierte Datei ausschließlich gegen die Regeln in
`.github/copilot-instructions.md`. Liste jede Regel einzeln auf und
vermerke "eingehalten" oder "verletzt (Grund)". Ändere den Code nicht.
```

## Aufgabe 2: Review-Ergebnis für `set-priority.ts`

```text
Regel 1 (wirft Error statt null): eingehalten
Regel 2 (nur über readTasks/writeTasks): eingehalten
Regel 3 (Signatur (...args) => Task | never): eingehalten
```

## Aufgabe 3: `add-missing-tests.prompt.md`

```markdown
---
description: Identifiziert und ergänzt fehlende Testfälle für die referenzierte Datei.
---

Analysiere die referenzierte Datei auf fehlende Testfälle, insbesondere
Grenzfälle und Fehlerpfade. Ergänze für jeden fehlenden Fall einen
konkreten, ausführbaren Test.
```

## Aufgabe 4: Ergebnis für `set-priority.ts`

Der Test-Prompt ergänzt typischerweise einen zuvor fehlenden Test für eine ungültige `id` (erwartet einen geworfenen Error) — dieser Fehlerpfad war im ursprünglichen Test aus Modul 5 noch nicht abgedeckt.
