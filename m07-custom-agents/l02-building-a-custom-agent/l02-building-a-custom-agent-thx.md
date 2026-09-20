# Lab 7.2: FocusList-Test-Agent bauen

Ziel: den `focuslist-test-agent` bauen, der ausschließlich Tests für neue Aktionen schreibt/pflegt, und damit FocusList von v3 auf v4 heben.

**Leitfragen:**

<details>
<summary>Warum ein eigener Test-Agent statt eines allgemeinen Chat-Modus?</summary>

Weil die Rolle "nur Tests schreiben/pflegen" wiederkehrend gebraucht wird und ein eingeschränkter Agent verhindert, dass dabei versehentlich Produktionscode geändert wird.

</details>

<details>
<summary>Worauf sollte der Test-Agent explizit Bezug nehmen?</summary>

Auf die bestehenden Testkonventionen in `tests/actions/` und auf `copilot-instructions.md`, damit neue Tests konsistent zu bestehenden bleiben.

</details>

<details>
<summary>Was passiert, wenn der Test-Agent auf eine Aktion ohne Tests trifft?</summary>

Er sollte fehlende Tests eigenständig ergänzen, nicht nur bestehende Tests anpassen.

</details>

## Begriffe & Mentales Modell

- **`focuslist-test-agent`:** projektspezifischer Agent, eingeschränkt auf Test-Dateien in `tests/`, mit Lese-/Schreibrechten nur dort.
- **v3 → v4:** Versionsstufe, die durch konsequente Testabdeckung aller vier bestehenden Aktionen erreicht wird.

## Aufbau des Agenten

- Systemprompt: schreibt/pflegt ausschließlich Tests, folgt bestehenden Testmustern.
- Tool-Rechte: Schreibzugriff nur auf `tests/**`, Lesezugriff auf `src/**`.
- Referenziert `copilot-instructions.md` für erwartetes Fehlerverhalten.

## Beispiel

Der Test-Agent erkennt, dass `set-priority.ts` bereits einen Test hat, aber `list-tasks.ts` noch keinen dedizierten Test — er ergänzt diesen fehlenden Test, ohne `list-tasks.ts` selbst zu verändern.

**Erwartetes Ergebnis:** nach dem Agentenlauf haben alle vier Aktionen mindestens einen Test, `src/` bleibt dabei unverändert.

## Grenzen

Der Test-Agent bewertet nicht die fachliche Richtigkeit der Aktionen selbst — er stellt nur sicher, dass sie getestet sind.

## Checkpoint & Brücke zur Übung

Checkpoint: Haben nach dem Agentenlauf alle vier Aktionen einen Test, und blieb `src/` unverändert? Die Übung führt das konkret durch.
