# Lab 2.3: Eingebaute Befehle & Basiskonfiguration

Ziel: die eingebauten Copilot-Befehle (`/explain`, `/fix`, `/tests`) gezielt einsetzen und die wichtigsten Grundeinstellungen einordnen können.

**Leitfragen:**

<details>
<summary>Wann lohnt sich `/explain` gegenüber einer freien Chat-Frage?</summary>

Wenn es um einen bereits markierten, konkreten Codeabschnitt geht — `/explain` ist dafür der direktere, kontextgebundene Weg.

</details>

<details>
<summary>Ersetzt `/fix` einen manuellen Review?</summary>

Nein — `/fix` schlägt eine mögliche Korrektur vor, die trotzdem geprüft werden muss, bevor sie übernommen wird.

</details>

<details>
<summary>Was regelt eine Basiskonfiguration wie `.vscode/settings.json` für Copilot?</summary>

Zum Beispiel, ob Inline-Vorschläge automatisch erscheinen, welche Dateitypen ausgeschlossen sind, oder projektspezifische Instructions-Pfade.

</details>

## Begriffe & Mentales Modell

- **`/explain`:** erklärt den markierten oder referenzierten Code in Prosa.
- **`/fix`:** schlägt eine Korrektur für einen erkannten Fehler oder eine Warnung vor.
- **`/tests`:** generiert Testfälle für den referenzierten Code.

## Die drei Befehle im Überblick

- `/explain`: Verständnis-Hilfe, kein Codeänderungsvorschlag.
- `/fix`: konkreter Änderungsvorschlag, muss reviewt werden.
- `/tests`: erzeugt Testgerüst, deckt nicht automatisch alle Grenzfälle ab.

## Beispiel

Eine Funktion mit einer offensichtlichen Off-by-one-Fehlerquelle wird markiert. `/explain` beschreibt die aktuelle Logik korrekt (inklusive des Fehlers, ohne ihn als Fehler zu erkennen). `/fix` schlägt danach eine Korrektur der Grenze vor.

**Erwartetes Ergebnis:** `/explain` allein deckt den Fehler nicht auf — erst der gezielte Blick auf die Grenze oder `/fix` macht ihn sichtbar.

## Grenzen

- `/fix` erkennt nicht jede Fehlerklasse, insbesondere keine reinen Logikfehler ohne Warnung/Diagnose.
- `/tests` erzeugt oft nur Positivfälle, wenn Grenzfälle nicht explizit erwähnt werden.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du benennen, wofür `/explain`, `/fix` und `/tests` jeweils NICHT geeignet sind? Die Übung testet alle drei an einem echten Snippet.
