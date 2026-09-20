# Lab 8.3 – Lösung

## Aufgabe 1 & 2: Zuordnung (Beispiele)

- "Code in der aktuellen Datei erklären" → eingebautes Tool reicht (kein externer Zugriff nötig).
- "Offene Tickets aus dem internen Ticket-System abfragen" → MCP sinnvoll (externe Datenquelle).
- "Datei umbenennen" → eingebautes Tool reicht.
- "Aktuellen Wetterbericht für eine Standortangabe abrufen" → MCP sinnvoll (externe Live-Daten).
- "Git-Historie der aktuellen Datei anzeigen" → eingebautes Tool reicht (meist bereits im Client integriert).

## Aufgabe 3: FocusList-MCP-Tools

Ein passender MCP-Server für externe Notizen/Tickets müsste z. B. Tools wie `search_tickets(query)`, `get_ticket(id)` und `list_open_tickets()` anbieten.

## Aufgabe 4: Risiko bei zu weitreichenden Rechten

Ein MCP-Server mit z. B. Schreibrechten auf das gesamte Ticket-System statt nur Lesezugriff auf FocusList-relevante Tickets könnte versehentlich (oder durch eine fehlerhafte Anfrage) Daten verändern oder offenlegen, die außerhalb des eigentlichen Bedarfs liegen — Zugriffsrechte sollten immer auf das Minimum begrenzt werden.
