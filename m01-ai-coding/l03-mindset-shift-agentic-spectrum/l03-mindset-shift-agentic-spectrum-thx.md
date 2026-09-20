# Lab 1.3: Mindset-Shift & Agentisches Spektrum

Dieser Kurs bewegt sich Modul für Modul über ein Spektrum von Autocomplete zu autonomem Agenten — dieses Lab ordnet die Stufen ein und legt den FocusList-Scope für den Rest des Kurses fest.

**Leitfragen:**

<details>
<summary>Was unterscheidet "ich tippe jede Zeile" von "ich delegiere und reviewe"?</summary>

Bei "ich tippe" liegt die Kontrolle bei jeder einzelnen Zeile beim Menschen; bei "ich delegiere" gibt der Mensch eine Absicht vor und prüft das Ergebnis, statt jeden Schritt selbst auszuführen.

</details>

<details>
<summary>Warum braucht mehr Autonomie mehr Leitplanken, nicht weniger?</summary>

Weil bei geringerer Kontrolle pro Einzelschritt (z. B. bei einem autonomen Agenten) Fehler sich ungebremst fortpflanzen können, wenn keine Regeln (Instructions, Skills, Review-Schritte) das auffangen.

</details>

<details>
<summary>Ist "agentisch" gleichbedeutend mit "unkontrolliert"?</summary>

Nein — agentische Workflows können sehr kontrolliert sein, wenn Tool-Rechte, Instructions und Review-Schritte gezielt gesetzt werden (Thema der späteren Module).

</details>

## Das agentische Spektrum

| Stufe             | Beispiel                                               | Kontrolle durch Mensch                |
| ----------------- | ------------------------------------------------------ | ------------------------------------- |
| Autocomplete      | Inline-Vorschlag einer Codezeile                       | sehr hoch (jede Zeile geprüft)        |
| Chat              | Frage/Antwort zu einem Snippet                         | hoch                                  |
| Agentic (geführt) | Copilot ändert mehrere Dateien nach Instructions/Skill | mittel                                |
| Agentic (autonom) | Custom Agent + Automatisierung (Hooks/MCP)             | niedrig, dafür mehr Leitplanken nötig |

```
Autocomplete → Chat → Agentic (geführt) → Agentic (autonom)
  M2-M3          M2       M4-M6                M7-M9
```

> **Merksatz:** je autonomer die Stufe, desto wichtiger werden Leitplanken statt Zeile-für-Zeile-Kontrolle.

## Projekt-Scope: FocusList

Durchgehendes Projekt für den ganzen Kurs: eine einfache Aufgabenliste. Der Bau startet bewusst ungeleitet in Modul 3, um die Motivation für spätere Leitplanken erlebbar zu machen.

**Erwartetes Ergebnis:** `focuslist-concept.md` mit Datenmodell und den drei Kernaktionen, unverändert weiterverwendet ab Modul 2.

## Fazit

- Vier Stufen: Autocomplete, Chat, Agentic (geführt), Agentic (autonom).
- Der Kurs durchläuft sie in genau dieser Reihenfolge, Modul für Modul.
- Ein fester FocusList-Scope ab jetzt ist die gemeinsame Basis für v0 → v7.

Weiter geht's in der Übung: den FocusList-Scope gemeinsam festlegen.
