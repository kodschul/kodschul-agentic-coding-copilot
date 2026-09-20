# Lab 8.4 – Übung: FocusList v5 → v6 mit einem MCP-Server

**Ändert die FocusList-Projektbasis?** Ja — fügt eine MCP-Konfiguration hinzu und nutzt sie im Chat.

## Ausgangslage

FocusList v5 aus Lab 8.2 (Pre-Commit-Hook eingerichtet).

## Prerequisites

- Ein bereitgestellter, lokal lauffähiger MCP-Server (z. B. Dateisystem- oder Such-Server) ist verfügbar.

## Aufgaben

1. Erstelle `.github/mcp/focuslist-mcp-config.json` mit der Verbindung zum bereitgestellten MCP-Server.
2. Starte den MCP-Server und bestätige, dass seine Tools im Chat-Tool-Angebot erscheinen.
3. Stelle eine Chat-Anfrage, die ein Tool des MCP-Servers tatsächlich nutzt (z. B. eine Textsuche über alle FocusList-Dateien).
4. Verifiziere das Ergebnis manuell gegen eine eigene Textsuche und bestätige die Übereinstimmung.

## Checkpoint

- Die MCP-Konfiguration existiert und der Server ist nachweislich verbunden (Tools sichtbar).
- Die Chat-Antwort aus Aufgabe 3 stimmt mit der manuellen Verifikation aus Aufgabe 4 überein.

## Abschlusskriterien

- Mindestens eine erfolgreiche, verifizierte Tool-Nutzung über den MCP-Server ist dokumentiert — das ist FocusList v6.

## Fallback

Falls der bereitgestellte MCP-Server in der Umgebung nicht startet: die Konfigurationsdatei trotzdem korrekt anlegen und den erwarteten Ablauf anhand der Server-Dokumentation schriftlich durchspielen, statt die Übung ganz auszulassen.
