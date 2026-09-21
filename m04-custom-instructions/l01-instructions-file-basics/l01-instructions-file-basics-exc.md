# Lab 4.1 – Übung: Wirkung von Instructions live vergleichen

**Ändert die FocusList-Projektbasis?** Nein — generische Übung an einem Fremdprojekt.

## Ausgangslage

[`project/sample-project/`](../../project/sample-project/) (dasselbe wie in Modul 2) ohne jegliche Instructions-Datei.

## Aufgaben

1. Stelle eine Implementierungsanfrage für ein neues, kleines Feature (z. B. eine Validierungsfunktion) ohne jede Instructions-Datei und notiere den verwendeten Fehlerbehandlungsstil.
2. Lege eine `*.instructions.md` mit `applyTo: "**/*.ts"` an, die eine konkrete Regel vorschreibt (z. B. "Funktionen werfen bei ungültiger Eingabe eine `Error`, geben niemals `null` zurück").
3. Stelle dieselbe Anfrage erneut und vergleiche den Fehlerbehandlungsstil mit Aufgabe 1.
4. Ändere die Regel in der Instructions-Datei auf das Gegenteil (z. B. "gibt bei Fehler `null` zurück") und wiederhole die Anfrage ein drittes Mal.

## Checkpoint

- Alle drei Ergebnisse (ohne Instructions, Regel A, Regel B) liegen nebeneinander dokumentiert vor.
- Mindestens einmal folgt das Ergebnis sichtbar der jeweils aktiven Regel.

## Abschlusskriterien

- Eine schriftliche Beobachtung liegt vor, ob und wie zuverlässig die Instructions-Datei das Verhalten beeinflusst hat.

## Fallback

Falls die dritte Anfrage die geänderte Regel nicht zuverlässig übernimmt: das als reales Beispiel für die Grenzen von Instructions dokumentieren, statt die Anfrage beliebig oft zu wiederholen.
