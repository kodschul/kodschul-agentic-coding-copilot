# Lab 8.4: Einen MCP-Server einbinden

Ziel: einen MCP-Server für FocusList einbinden und im Chat tatsächlich nutzen, um v5 auf v6 zu heben.

**Leitfragen:**

<details>
<summary>Wo wird ein MCP-Server für ein Projekt konfiguriert?</summary>

In einer Konfigurationsdatei (z. B. `.github/mcp/focuslist-mcp-config.json` bzw. der clientspezifischen MCP-Konfiguration).

</details>

<details>
<summary>Woran erkennt man, dass ein MCP-Server erfolgreich verbunden ist?</summary>

Die vom Server bereitgestellten Tools erscheinen im Chat-Tool-Angebot und liefern bei Aufruf echte, nicht erfundene Daten.

</details>

<details>
<summary>Was tun, wenn der MCP-Server keine Verbindung aufbaut?</summary>

Konfiguration (Pfad, Zugangsdaten, Serverstart) prüfen, bevor man annimmt, das Konzept funktioniere grundsätzlich nicht.

</details>

## Begriffe & Mentales Modell

- **MCP-Konfiguration:** die Datei, die dem Client mitteilt, welcher MCP-Server wie gestartet/erreicht wird.
- **v5 → v6:** Versionsstufe, die durch tatsächliche Nutzung eines angebundenen externen Servers im Chat erreicht wird.

## Vorgehen in diesem Lab

- Einen einfachen, bereits vorbereiteten MCP-Server (z. B. Dateisystem- oder Such-Server) verbinden.
- Im Chat ein passendes Tool des Servers tatsächlich aufrufen.
- Das Ergebnis gegen die bekannte, echte Datenquelle verifizieren.

## Beispiel

Nach Anbindung eines Datei-/Such-MCP-Servers liefert die Chat-Anfrage "Suche nach 'priority' in allen Projektdateien" echte Fundstellen aus dem MCP-Server, nicht aus dem Modellgedächtnis erfunden.

**Erwartetes Ergebnis:** die zurückgegebenen Fundstellen entsprechen exakt einer manuellen Textsuche im Projekt.

## Grenzen

Ein MCP-Server muss aktiv laufen und erreichbar sein — ohne laufenden Serverprozess liefert die Anbindung keine Ergebnisse.

## Checkpoint & Brücke zur Übung

Checkpoint: Liefert deine Chat-Anfrage über den MCP-Server tatsächlich echte, verifizierbare Daten? Die Übung führt das konkret durch.
