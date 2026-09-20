# Lab 2.1: Inline-Vervollständigung

Ziel: Vorschläge von Copilot gezielt annehmen, ablehnen und aktiv triggern können, statt sie nur passiv abzuwarten.

**Leitfragen:**

<details>
<summary>Was passiert, wenn ich einfach weitertippe, ohne einen Vorschlag anzunehmen?</summary>

Der Vorschlag verschwindet oder wird durch einen neuen ersetzt — nichts wird ungefragt übernommen.

</details>

<details>
<summary>Wie bekomme ich gezielt mehrere Alternativen zu einem Vorschlag?</summary>

Über die Tastenkombination zum Durchblättern alternativer Vorschläge (z. B. Alt+]/Alt+[ unter VS Code) oder das Copilot-Vorschlagsfenster.

</details>

<details>
<summary>Warum liefert Copilot manchmal gar keinen Vorschlag?</summary>

Meist fehlt eindeutiger Kontext (z. B. leere Datei ohne Namenskonvention) oder die Konfidenz des Modells ist zu gering, um etwas vorzuschlagen.

</details>

## Begriffe & Mentales Modell

- **Inline-Vervollständigung (Ghost Text):** grau angezeigter Vorschlag direkt im Editor, der erst durch Tab/Annahme aktiv wird.
- **Annehmen (ganz/teilweise):** Tab übernimmt den ganzen Vorschlag, Wort-für-Wort-Annahme (z. B. Cmd/Ctrl+Right) übernimmt nur einen Teil.
- **Trigger:** ein Kommentar, eine Funktionssignatur oder ein Dateiname kann Copilot gezielt zu einem passenderen Vorschlag anregen.

## Annehmen vs. Ablehnen vs. Triggern

- Annehmen: Tab — der komplette Vorschlag wird übernommen.
- Ablehnen: Esc oder einfach weitertippen — der Vorschlag verschwindet folgenlos.
- Gezielt triggern: einen aussagekräftigen Kommentar oder eine klare Signatur schreiben, bevor man auf den Vorschlag wartet.

## Beispiel

Eine leere Funktion `function validateEmail(` liefert oft nur einen generischen Vorschlag. Ein vorangestellter Kommentar `// prüft, ob ein String ein gültiges E-Mail-Format hat (RFC-vereinfachte Regex)` liefert einen deutlich passenderen Vorschlag.

**Erwartetes Ergebnis:** der Vorschlag mit Kommentar enthält eine Regex-basierte Prüfung, die ohne Kommentar oft fehlt oder allgemeiner ausfällt.

## Grenzen

- Inline-Vervollständigung schlägt meist nur die nächsten paar Zeilen vor, keine größeren Architekturentscheidungen.
- Ohne Kontext aus verwandten Dateien bleiben Vorschläge generisch.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du den Unterschied zwischen Ablehnen und gezieltem Triggern in einem Satz erklären? Die Übung testet das an einem Fremdprojekt.
