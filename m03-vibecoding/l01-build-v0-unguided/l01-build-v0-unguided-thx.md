# Lab 3.1: FocusList v0 bauen – AI ohne Leitplanken

Ziel: FocusList v0 (anlegen/auflisten/erledigen) rein per ungeleitetem Chat-Prompting bauen, ohne Projektkontext oder Vorgaben.

**Leitfragen:**

<details>
<summary>Warum wird v0 bewusst OHNE Instructions oder Konventionen gebaut?</summary>

Damit die entstehenden Inkonsistenzen und Lücken später (Lab 3.2, Modul 4) sichtbar und konkret behebbar werden, statt nur behauptet zu werden.

</details>

<details>
<summary>Reicht das in Lab 1.3 erstellte Konzeptdokument als einzige Vorgabe?</summary>

Ja — das ist genau der Punkt: Copilot bekommt nur das Konzeptdokument, keine Stil- oder Architekturregeln.

</details>

<details>
<summary>Ist es schlimm, wenn v0 stilistisch inkonsistent wird?</summary>

Nein, im Gegenteil — diese Inkonsistenz ist der beabsichtigte Lerninhalt dieses Moduls, nicht ein zu vermeidender Fehler.

</details>

## Begriffe & Mentales Modell

- **v0:** die allererste, ungeleitete Version von FocusList — Referenzpunkt für alle folgenden Versionsstufen.
- **Ungeleitetes Prompting:** Anfragen an Copilot ohne `copilot-instructions.md`, ohne Skills, nur mit dem Konzeptdokument als Kontext.

## Vorgehen in diesem Lab

- Ausgangspunkt: das leere Starter-Repo plus `focuslist-concept.md` aus Lab 1.3.
- Drei Chat-Anfragen nacheinander: Datenmodell/Speicherung, "Aufgabe anlegen", "Aufgaben auflisten", "Aufgabe erledigen".
- Jede Anfrage wird einzeln gestellt und das Ergebnis direkt übernommen, ohne es zwischen den Anfragen zu vereinheitlichen.

## Beispiel

Eine Anfrage "Implementiere das Anlegen einer Aufgabe laut `focuslist-concept.md`" liefert eine funktionierende, aber isolierte Implementierung. Eine zweite, separate Anfrage für "Aufgaben auflisten" kann unbemerkt einen leicht anderen Speicherzugriff-Stil verwenden.

**Erwartetes Ergebnis:** v0 funktioniert grundsätzlich, zeigt aber bereits erste stilistische Brüche zwischen den drei Aktionen.

## Grenzen

Dieses Lab produziert absichtlich ein noch unfertiges Zwischenergebnis — die Analyse und Bewertung der Schwächen folgt erst in Lab 3.2, nicht hier.

## Checkpoint & Brücke zur Übung

Checkpoint: Läuft FocusList v0 lokal und können alle drei Aktionen (anlegen/auflisten/erledigen) ausgeführt werden? Die Übung führt dich Schritt für Schritt dorthin.
