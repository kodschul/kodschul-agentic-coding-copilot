# KI beim Programmieren

Copilot hilft an mehr Stellen als beim Tippen: vom Planen bis zum Testen. Wie viel Kontrolle dabei beim Menschen bleibt, beschreibt das agentische Spektrum von Autocomplete bis zum autonomen Agenten.

## Leitfragen

<details>
<summary>Wo hilft KI heute im Entwicklungsalltag am meisten?</summary>

Typisch sind Schreiben von Boilerplate, Erklären fremden Codes, Fehlersuche und Tests. Planen und Refactoren werden oft unterschätzt.

</details>

<details>
<summary>Was unterscheidet "jede Zeile selbst tippen" von "delegieren und reviewen"?</summary>

Beim Tippen kontrolliert der Mensch jede Zeile. Beim Delegieren gibt er eine Absicht vor und prüft das Ergebnis, statt jeden Schritt selbst auszuführen.

</details>

<details>
<summary>Warum braucht mehr Autonomie mehr Leitplanken, nicht weniger?</summary>

Bei weniger Kontrolle pro Einzelschritt pflanzen sich Fehler ungebremst fort, wenn keine Regeln und Review-Schritte sie auffangen.

</details>

<details>
<summary>Ist "agentisch" gleichbedeutend mit "unkontrolliert"?</summary>

Nein. Agentische Workflows können sehr kontrolliert sein, wenn Werkzeugrechte, schriftliche Projektregeln und Review-Schritte gezielt gesetzt werden. Genau das bauen die Module 4 bis 9 auf.

</details>

## Fünf Einsatzpunkte im Coding-Workflow

| Phase | Typische Nutzung | Beispiel |
| --- | --- | --- |
| Planen | Aufgabe in Teilschritte zerlegen lassen | Chat: "Wie gehe ich diese Änderung an?" |
| Schreiben | Code/Funktion aus Beschreibung generieren | Inline-Vorschlag, Chat |
| Analysieren | bestehenden Code erklären lassen | `/explain` |
| Refactoren | Struktur verbessern, ohne Verhalten zu ändern | `/fix`, gezielter Chat-Auftrag |
| Testen | Tests generieren oder Fehlschläge diagnostizieren | `/tests` |

```
Planen → Schreiben → Analysieren → Refactoren → Testen
   ↑___________________________________________|
        (iterativ, kein linearer Einmal-Durchlauf)
```

- Ein generierter Test kann eine Refactoring-Runde auslösen, ein Refactoring neue Tests nötig machen.
- Planen und Analysieren passiert meist im Chat, Schreiben und Refactoren oft inline oder im Agent-Modus.
- Copilot kennt den Gesamtplan eines Projekts nicht automatisch: ohne Kontext (referenzierte Dateien, Instructions) bleibt jede Phase auf die aktuelle Anfrage beschränkt.

## Das agentische Spektrum

| Stufe | Beispiel | Kontrolle durch Mensch |
| --- | --- | --- |
| Autocomplete | Inline-Vorschlag einer Codezeile | sehr hoch (jede Zeile geprüft) |
| Chat | Frage/Antwort zu einem Snippet | hoch |
| Agentic (geführt) | Copilot ändert mehrere Dateien nach Instructions/Skill, jede Änderung als Diff geprüft | mittel |
| Agentic (autonom) | Custom Agents plus Automatisierung (Hooks, MCP); der Mensch prüft das Endergebnis | niedrig, dafür mehr Leitplanken nötig |

```
Autocomplete → Chat → Agentic (geführt) → Agentic (autonom)
  M2             M2       M3–M6               M7–M9
```

> **Merksatz:** Je autonomer die Stufe, desto wichtiger werden Leitplanken statt Zeile-für-Zeile-Kontrolle.

## Mindset-Shift: delegieren und reviewen

| Bisher | Agentisch |
| --- | --- |
| Zeile für Zeile selbst schreiben | Absicht formulieren ("baue Aktion X") |
| Konventionen im Kopf | Konventionen schriftlich im Repo (Instructions, Skills) |
| Review nach Gefühl | Review gegen Regeln, Tests, Review-Agent |
| ein großer Prompt | Spezifikation, dann Umsetzung in Schritten |

- Die Rolle verschiebt sich vom Tippen zum Steuern und Prüfen; die Verantwortung bleibt (siehe [04-sicherheit-und-verantwortung.md](04-sicherheit-und-verantwortung.md)).
- Der Kurs durchläuft das Spektrum an einem Projekt: FocusList entsteht in Modul 3 ungeleitet und bekommt danach Modul für Modul Leitplanken.

## Selbst ausprobieren

1. Ordne jeder der vier Spektrum-Stufen ein Beispiel aus dem eigenen Arbeitsalltag zu.
2. Ist eine Stufe unbekannt, notiere den Grund, warum sie bisher nicht genutzt wurde.
3. Markiere die Phase aus dem Workflow, in der KI bisher am wenigsten genutzt wurde.

<details>
<summary>Beispiele je Stufe</summary>

- **Autocomplete:** eine einzelne Codezeile wird beim Tippen vorgeschlagen und per Tab übernommen.
- **Chat:** eine Frage zu einer Fehlermeldung wird gestellt und die Antwort manuell umgesetzt.
- **Agentic (geführt):** Copilot benennt auf Anweisung eine Funktion über mehrere Dateien um; jede Änderung wird als Diff geprüft und angenommen.
- **Agentic (autonom):** aus einer Spezifikation ("Aufgaben nach Fälligkeit sortieren") schreibt ein Agent den Code, ein zweiter die Tests, ein dritter prüft im Review; der Mensch prüft erst das Endergebnis (Module 7 und 9).

</details>

## Fazit

- KI hilft in jeder Phase: Planen, Schreiben, Analysieren, Refactoren, Testen.
- Vier Stufen: Autocomplete, Chat, Agentic (geführt), Agentic (autonom).
- Mehr Autonomie verlangt mehr schriftliche Leitplanken.

Weiter mit [03-ki-in-softwareprojekten.md](03-ki-in-softwareprojekten.md): KI jenseits der einzelnen Codezeile.
