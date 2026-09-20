# Lab 6.2 – Übung: FocusList v2 → v3 mit einer Prompt-Bibliothek

**Ändert die FocusList-Projektbasis?** Ja — fügt drei wiederverwendbare Prompt-Dateien hinzu und wendet sie auf bestehenden Code an.

## Ausgangslage

FocusList v2 aus Modul 5.

## Prerequisites

- FocusList v2 ist lauffähig (inkl. `set-priority.ts`).

## Aufgaben

1. Schreibe `.github/prompts/focuslist-code-review.prompt.md`, der Code gegen die Regeln aus `copilot-instructions.md` prüft und Abweichungen auflistet, ohne sie selbst zu ändern.
2. Wende den Review-Prompt auf `set-priority.ts` an und notiere das Ergebnis.
3. Schreibe `.github/prompts/add-missing-tests.prompt.md`, der fehlende Testfälle (insbesondere Grenzfälle) für eine referenzierte Datei identifiziert und ergänzt.
4. Wende den Test-Prompt auf `set-priority.ts` an und prüfe, ob ein zuvor fehlender Grenzfall-Test (z. B. ungültige Priorität) ergänzt wurde.

## Checkpoint

- Der Review-Prompt liefert eine konkrete, auf `copilot-instructions.md` bezogene Liste (nicht nur "sieht gut aus").
- Der Test-Prompt ergänzt mindestens einen zusätzlichen, vorher fehlenden Testfall.

## Abschlusskriterien

- Beide Prompt-Dateien existieren, wurden auf echten FocusList-Code angewendet, und die Ergebnisse sind dokumentiert — das ist FocusList v3.

## Fallback

Falls der Test-Prompt keinen neuen Grenzfall findet: manuell einen offensichtlichen Grenzfall (z. B. ungültiger Priority-Wert) benennen und als Ergänzung zur Prompt-Definition festhalten.
