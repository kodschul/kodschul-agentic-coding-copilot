# KI in Softwareprojekten

Copilot wirkt nicht nur auf Codezeilen, sondern auf den ganzen Projektzyklus: von Requirements über Konzeption bis zu Styleguide und Konventionen.

## Leitfragen

<details>
<summary>Kann KI Anforderungen klären?</summary>

Sie kann Anforderungen strukturieren und Lücken aufdecken. Die Entscheidung, was das Projekt tatsächlich braucht, bleibt beim Team und den Stakeholdern.

</details>

<details>
<summary>Woher kennt Copilot die Konventionen eines Projekts?</summary>

Nur aus dem Kontext: aus offenen und referenzierten Dateien und aus Instructions im Repo (Modul 4). Ohne diesen Kontext schlägt es allgemein übliche Muster vor.

</details>

<details>
<summary>Was passiert, wenn eine vage Anforderung direkt umgesetzt wird?</summary>

Das Modell füllt jede Lücke mit einer eigenen Annahme. Der Code läuft, aber Randfälle sind zufällig gelöst.

</details>

## Wo KI in Softwareprojekten ansetzt

| Bereich | Nutzen | Grenze |
| --- | --- | --- |
| Requirements | Anforderungen strukturieren, Lücken und Randfälle aufdecken | ersetzt keine Stakeholder-Abstimmung |
| Konzeption | Architekturoptionen vergleichen lassen | trifft keine verbindliche Entscheidung |
| Styles & Patterns | konsistente Namens- und Strukturkonventionen vorschlagen | erkennt projektspezifische Konventionen nur mit Kontext (Instructions) |
| Dokumentation | README, Changelog, Docstrings aus dem Code ableiten | nur so aktuell wie der Code, den sie sieht (Modul 6) |

## Beispiel: vage Anforderung zerlegen

Anforderung: "Nutzer sollen Aufgaben verwalten können."

| Offene Frage | Warum sie zählt |
| --- | --- |
| Wer darf löschen? | Berechtigung, sonst entscheidet das Modell |
| Was passiert bei leerem Titel? | Eingabeprüfung |
| Was passiert bei unbekannter id? | Fehlerverhalten, Exit-Code |
| Wo liegen die Daten? | Speicherung, Datei oder Datenbank |

- Copilot kann diese Fragen auf Zuruf erzeugen; das Klären bleibt Aufgabe des Teams.
- Genau diese Lücken füllt das Modell in Modul 3 (Vibecoding) selbst, wenn niemand sie klärt.

> **Merksatz:** KI strukturiert und beschleunigt Requirements-Arbeit, sie ersetzt nicht die Entscheidung, was das Projekt tatsächlich braucht.

## Bezug zum Kurs

| Modul | Was daraus wird |
| --- | --- |
| Modul 3 | vage Wünsche ohne Regeln → das Modell trifft die Annahmen |
| Modul 4 | Konventionen stehen schriftlich in `copilot-instructions.md` |
| Modul 9 | Spezifikation vor der Implementierung (Spec-Driven Development) |

## Selbst ausprobieren

1. Frage im Copilot Chat (Ask-Modus, kein Projekt nötig): `Zerlege die Anforderung "Nutzer sollen Aufgaben verwalten können" in offene Fragen, die vor der Umsetzung geklärt werden müssen.`
2. Markiere in der Antwort die Fragen, die nur das Team beantworten kann.

**Erwartete Beobachtung:** Die Antwort liefert schnell eine brauchbare Fragenliste (Rollen, Validierung, Speicherung, Fehlerfälle), beantwortet aber keine davon verbindlich.

## Fazit

- KI hilft bei Requirements, Konzeption, Konventionen und Doku, entscheidet aber nichts verbindlich.
- Projektspezifische Konventionen kennt Copilot nur, wenn sie im Kontext stehen.
- Ungeklärte Fragen beantwortet das Modell mit eigenen Annahmen.

Weiter mit [04-sicherheit-und-verantwortung.md](04-sicherheit-und-verantwortung.md): wer für KI-generierten Code verantwortlich ist.
