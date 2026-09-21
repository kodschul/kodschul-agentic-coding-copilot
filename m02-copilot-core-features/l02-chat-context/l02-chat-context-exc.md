# Lab 2.2 – Übung: Chat-Kontext gezielt steuern

**Ändert die FocusList-Projektbasis?** Nein — generische Übung am selben Fremdprojekt aus Lab 2.1.

## Ausgangslage

[`project/sample-project/`](../../project/sample-project/) mit einer Datenmodell-Datei (`src/models.ts`) und einer leeren Implementierungsdatei (`src/validators.ts`).

## Aufgaben

1. Stelle im Chat eine Implementierungsfrage zur leeren Datei, ohne irgendeine Datei zu referenzieren, und notiere die Antwort.
2. Stelle dieselbe Frage erneut, diesmal mit `#file`-Referenz auf die Datenmodell-Datei, und notiere die neue Antwort.
3. Vergleiche beide Antworten konkret: Welche Feldnamen/Annahmen unterscheiden sich?
4. Formuliere eine dritte Anfrage, die zusätzlich `#selection` auf einen markierten Codeabschnitt nutzt, und beschreibe den Unterschied zur reinen `#file`-Antwort.

## Checkpoint

- Beide Antworten aus Aufgabe 1 und 2 liegen nebeneinander dokumentiert vor.
- Mindestens ein konkreter Unterschied (z. B. Feldname) ist benannt.

## Abschlusskriterien

- Eine schriftliche Begründung liegt vor, wann `#file` und wann `#selection` die passendere Wahl ist.

## Fallback

Falls kein Fremdprojekt zur Hand ist: dieselbe Übung an einer beliebigen bereits vorhandenen kleinen Datei im eigenen Editor durchführen.
