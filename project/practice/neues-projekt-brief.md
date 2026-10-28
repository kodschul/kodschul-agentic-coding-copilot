# Projektbrief: WetterBlick

Fiktives Projekt für Modul 10 (`02-best-practices-und-ausblick.md`). Gesucht ist ein Plan, welche agentischen Bausteine (Instructions, Skills, Prompt-Dateien, Agents, Tasks und Hooks, MCP, OpenSpec) für dieses Projekt zuerst eingeführt werden und welche vorerst nicht.

## Idee

WetterBlick ist ein kleines Web-Dashboard für die Hausverwaltung eines Wohnquartiers. Es zeigt für mehrere Standorte die aktuelle Temperatur, Niederschlag und eine Frostwarnung für die nächsten 48 Stunden. Der Hausmeisterdienst entscheidet damit, wann Wege gestreut werden.

## Rahmen

- Team: zwei Entwicklerinnen, Teilzeit, wechselnde Anwesenheit.
- Laufzeit: sechs Wochen bis zur ersten Version, danach gelegentliche Erweiterungen.
- Stack: TypeScript (Node.js) oder Python, frei wählbar; ein einfaches Frontend ohne Framework.
- Daten: eine öffentliche Wetter-API mit persönlichem API-Schlüssel; Standorte in einer JSON-Datei.

## Anforderungen für Version 1

1. Standorte anzeigen, anlegen und löschen.
2. Wetterdaten pro Standort abrufen und höchstens alle 15 Minuten neu laden (Kontingent der API).
3. Frostwarnung, wenn die Vorhersage unter 1 °C fällt.
4. Fehlermeldung statt leerer Kacheln, wenn die API nicht antwortet.

## Bekannte Risiken und Wünsche

- Der API-Schlüssel darf nicht im Repository landen.
- Jede neue Kachel (z. B. Wind, Pollenflug) folgt demselben Muster: Abruf, Umrechnung, Anzeige, Test.
- Die Hausverwaltung ändert ihre Wünsche oft kurzfristig; Entscheidungen sollen nachvollziehbar bleiben.
- Nach Version 1 übernimmt eine dritte Person das Projekt, die beim Start nicht dabei war.
