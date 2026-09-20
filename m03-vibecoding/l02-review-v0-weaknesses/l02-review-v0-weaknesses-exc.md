# Lab 3.2 – Übung: Schwächen von v0 systematisch dokumentieren

**Ändert die FocusList-Projektbasis?** Nein — reine Analyse des in Lab 3.1 gebauten v0-Stands (fügt eine Analyse-Notiz hinzu, ohne Code zu ändern).

## Ausgangslage

Das lauffähige FocusList v0 aus Lab 3.1.

## Aufgaben

1. Vergleiche `add-task.ts`, `list-tasks.ts` und `complete-task.ts` Zeile für Zeile auf stilistische Unterschiede (Benennung, Fehlerbehandlung, Struktur) und notiere mindestens zwei konkrete Abweichungen.
2. Prüfe jede in v0 getroffene Default-Entscheidung (z. B. Default-Priorität) gegen `focuslist-concept.md` — stimmt sie überein oder wurde sie vom Modell frei erfunden?
3. Wähle eine in v0 genutzte externe Funktion/API und verifiziere anhand der offiziellen Dokumentation, ob sie wie angenommen funktioniert.
4. Erstelle eine priorisierte Liste (Muss/Kann) aller gefundenen Schwächen in `v0-weaknesses.md`.

## Checkpoint

- Mindestens zwei konkrete Stil-Abweichungen sind mit Dateiname/Zeile benannt.
- Die Verifikation aus Aufgabe 3 endet mit einem klaren Ergebnis: bestätigt oder tatsächlich fehlerhaft/hallucinated.

## Abschlusskriterien

- `v0-weaknesses.md` existiert mit einer priorisierten Liste, die in Modul 4 direkt als Arbeitsgrundlage dient.

## Fallback

Falls keine Halluzination in der eigenen v0-Version zu finden ist: eine der beiden von Copilot am häufigsten verwendeten APIs stichprobenartig prüfen und das Prüfergebnis (auch wenn "korrekt") trotzdem dokumentieren — der Prüfprozess selbst ist der Lerninhalt.
