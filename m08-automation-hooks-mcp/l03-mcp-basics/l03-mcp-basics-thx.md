# Lab 8.3: Was ist MCP?

Ziel: erklären können, was das Model Context Protocol (MCP) ist und wofür man einen MCP-Server im Vergleich zu eingebauten Tools braucht.

**Leitfragen:**

<details>
<summary>Wofür steht MCP?</summary>

Model Context Protocol — ein offener Standard, über den ein Modell/Client strukturiert auf externe Tools und Datenquellen zugreifen kann.

</details>

<details>
<summary>Wie unterscheidet sich ein MCP-Server von einem eingebauten Tool?</summary>

Ein MCP-Server ist ein separater Prozess, der eigene Tools/Ressourcen über ein standardisiertes Protokoll bereitstellt, statt fest im Client eingebaut zu sein.

</details>

<details>
<summary>Wann lohnt sich ein MCP-Server konkret?</summary>

Wenn Copilot Zugriff auf eine externe Datenquelle braucht (z. B. Ticket-System, interne Notizen), die keine eingebaute Funktion abdeckt.

</details>

## Begriffe & Mentales Modell

- **MCP-Server:** ein Prozess, der Tools/Ressourcen über das Model Context Protocol bereitstellt.
- **MCP-Client:** die Anwendung (z. B. VS Code/Copilot), die sich mit einem oder mehreren MCP-Servern verbindet.

## Wann MCP vs. eingebaute Tools

- Eingebaute Tools: Datei-/Codebase-Operationen, die der Client ohnehin mitbringt.
- MCP-Server: externe Systeme, die projekt-/firmenspezifisch sind und nicht Teil des Standard-Tool-Sets sein können.

## Beispiel

Ein Team nutzt ein internes Ticket-System. Ein MCP-Server für dieses System erlaubt Copilot, im Chat direkt offene Tickets abzufragen, ohne das Ticket-System manuell zu öffnen.

**Erwartetes Ergebnis:** eine Chat-Anfrage "Welche offenen Tickets betreffen FocusList?" liefert eine echte Antwort aus dem angebundenen System, nicht eine Vermutung.

## Grenzen

Ein MCP-Server muss vertrauenswürdig konfiguriert sein — er kann potenziell sensible externe Daten offenlegen, wenn Zugriffsrechte nicht sauber begrenzt sind.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du ein konkretes Beispiel nennen, wofür sich ein MCP-Server lohnt und wofür nicht? Die Übung bindet einen ersten MCP-Server ein.
