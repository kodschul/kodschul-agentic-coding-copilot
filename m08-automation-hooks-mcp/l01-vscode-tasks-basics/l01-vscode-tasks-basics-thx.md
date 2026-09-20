# Lab 8.1: VS Code Tasks einrichten

Ziel: eine wiederverwendbare VS Code Task für Lint/Build/Test einrichten, statt Befehle wiederholt manuell einzutippen.

**Leitfragen:**

<details>
<summary>Was ist der Vorteil einer Task gegenüber einem manuell getippten Terminalbefehl?</summary>

Eine Task ist wiederverwendbar, per Tastenkürzel/Command Palette aufrufbar und im Projekt versioniert — jeder im Team nutzt denselben Befehl.

</details>

<details>
<summary>Wo liegt eine VS-Code-Task-Definition?</summary>

In `.vscode/tasks.json` im Projektordner.

</details>

<details>
<summary>Kann eine Task mehrere Befehle kombinieren?</summary>

Ja, z. B. Lint gefolgt von Test als zwei Schritte oder als zusammengesetzter Befehl.

</details>

## Begriffe & Mentales Modell

- **Task:** eine in `.vscode/tasks.json` definierte, wiederverwendbare Befehlskette.
- **Problem Matcher:** ordnet Task-Ausgabe automatisch Fehlern/Warnungen im Editor zu.

## Aufbau einer Task

- `label`: sprechender Name (z. B. "Lint + Test").
- `command`: der auszuführende Shell-Befehl.
- `problemMatcher`: optional, für automatische Fehlerzuordnung.

## Beispiel

Eine Task "Lint + Test" führt `npm run lint && npm test` aus. Statt beide Befehle jedes Mal manuell einzutippen, wird die Task per Command Palette ("Run Task") aufgerufen.

**Erwartetes Ergebnis:** ein Tastendruck reicht, um Lint und Test nacheinander laufen zu lassen; Fehler erscheinen direkt im Editor-Problems-Panel.

## Grenzen

Eine Task automatisiert nur die Ausführung — sie behebt keine gefundenen Lint-/Testfehler selbst.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du erklären, warum eine Task im Team sinnvoller ist als ein persönliches Shell-Alias? Die Übung richtet eine Task an einem Fremdprojekt ein.
