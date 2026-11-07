# Cheatsheet Modul 3: Vibecoding oder Agentic Coding

## Zwei Wege (Lab 3.1)

| | Vibecoding | Agentic Coding |
| --- | --- | --- |
| Eingabe | ein Prompt, was man sehen will | Prompt plus Regeln, Abläufe, Rollen aus dem Repo |
| Code lesen | nein | ja, Diff vor der Übernahme |
| Prüfung | Blick in den Browser | Tests, Checks, Review, Browser |
| Geeignet für | Prototyp, Demo, Wegwerf-Skript | Team-Code, Produktion, sicherheitskritischer Code |

## Entscheidungshilfe

| Frage | Ja → |
| --- | --- |
| Lebt der Code länger als ein paar Tage? | agentisch |
| Arbeiten andere mit oder übernehmen ihn? | agentisch |
| Echte Nutzerdaten oder im Internet? | agentisch |
| Kostet ein Fehler Geld, Daten oder Vertrauen? | agentisch |
| alle vier Nein | Vibecoding ist in Ordnung |

## One-Shot-Prompt (Lab 3.2)

| Teil | Inhalt |
| --- | --- |
| Ziel | was am Ende entstehen soll |
| Funktionen | was man sehen und tun kann, nummeriert |
| Stack | womit gebaut wird |
| Fertig, wenn | woran man das Ergebnis erkennt |

Beispiel-Prompt: `project/focuslist/vibecoding-prompt.md` · Beispielergebnis: `project/focuslist/<stack>/steps/m03/`

## Spielregeln Lab 3.2

| Regel | Warum |
| --- | --- |
| Copilot-Harness, Agent **Agent**, Autopilot aus | jede Aktion bleibt sichtbar |
| Prompt unverändert senden, kein Kontext | zeigt, was der Agent selbst entscheidet |
| alles mit Keep annehmen, Code nicht lesen | so arbeitet Vibecoding |
| Terminal-Befehle lesen, Paketinstallationen ablehnen | Sicherheitsnetz aus Lab 2.5 bleibt |
| kein zweiter Prompt, nichts nachbessern | Ergebnis ist der Status quo |

## Bewertungsraster (Lab 3.3)

| Frage | Prüfung |
| --- | --- |
| Läuft es? | Normalfall, leerer Titel, `/api/tasks?status=all` |
| Einheitlich? | geänderte Dateien in der Chat-Sitzung; gleiche Aufgabe zweimal gelöst? |
| Tests? | `pytest` bzw. `npm test`: neue Tests dabei? |
| Sicher? | Titel `<b>fett</b>`; im Diff `\|safe`, `${…}`, feste Passwörter |
| Unnötige Pakete? | `package.json` bzw. `requirements.txt` mit dem Startgerüst vergleichen |
| Wartbar? | Logik an einer Stelle? ein Startbefehl? |

## Fehlerklassen

| Fehlerklasse | Beispiel FocusList v0 | Prüffrage |
| --- | --- | --- |
| Inkonsistenz | Filter zweimal unterschiedlich; Callbacks und `async/await` gemischt | Wo steht das noch einmal? |
| Falsche Annahme | ID per `len(tasks) + 1` bzw. `tasks.length + 1` | Wer hat das festgelegt? |
| Fehlende Tests | nur der Test für `GET /` | Welcher Test fängt das? |
| Sicherheitslücke | ungeprüfte Eingabe, ungeschützte Ausgabe, Secret im Code, Pfad aus der URL | Was passiert mit böswilliger Eingabe? |
| Überflüssige Abhängigkeit | Vorschlag „Express installieren“ | Kann die Plattform das schon? |

## Mangel → Baustein

| Mangel | Baustein | Modul |
| --- | --- | --- |
| Agent kennt Stack, Struktur, Regeln nicht | Instructions | m04 |
| Tests oder Sicherheitsprüfung jedes Mal anders | Skill | m05 |
| niemand prüft unabhängig | Custom Agent | m06 |
| Riskantes tun, Tests vergessen | Hook | m07 |
| Agent sieht die laufende App nicht | MCP | m07 |
| unklar, was gebaut werden soll | Spec | m08 |

## Befehle

| Befehl / Aktion | Wirkung |
| --- | --- |
| `node project/focuslist/catch-up.mjs <python\|node> m03 <ordner>` | Startgerüst für Lab 3.2 herstellen |
| Chat-Sitzung → „Changes“ | alle Änderungen des Agenten als Diff |
| Explorer: **Select for Compare**, dann **Compare with Selected** | zwei Dateien (z. B. Startgerüst und v0) vergleichen |
| `node project/focuslist/catch-up.mjs <python\|node> m04 <ordner>` | Referenzstand v0 herstellen |

## Status-quo-Liste (Ergebnis Lab 3.3)

| Spalte | Inhalt |
| --- | --- |
| # | Rang nach Kosten in Produktion |
| Mangel | kurz, mit Datei |
| Fehlerklasse | eine der fünf Klassen |
| Baustein | Instructions … Spec |
| Modul | m04 … m08 |

Ablage: `~/kurs/notizen/status-quo.md` · 5–8 Zeilen
