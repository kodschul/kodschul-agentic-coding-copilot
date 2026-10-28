# Cheatsheet Modul 1: KI in der Softwareentwicklung

## LLM-Grundlagen ([01](01-llm-grundlagen.md))

| Begriff | Merkpunkt |
| --- | --- |
| LLM | sagt das plausibelste nächste Token voraus, führt keinen Code aus |
| Token | Wortteil; Kosten und Limits werden in Tokens gemessen |
| Context Window | Budget für System-Prompt, Instructions, Dateien, Verlauf, Anfrage |
| Kontext | passender Kontext schärft, irrelevanter verwässert |
| Halluzination | plausibel, aber falsch, z. B. erfundene API |
| RAG | suchen → in den Prompt einfügen → antworten (`#codebase`) |

## KI beim Programmieren ([02](02-ki-beim-programmieren.md))

| Thema | Merkpunkt |
| --- | --- |
| Workflow | Planen → Schreiben → Analysieren → Refactoren → Testen, iterativ |
| Spektrum | Autocomplete → Chat → Agentic (geführt) → Agentic (autonom) |
| Mindset | Absicht vorgeben, Ergebnis gegen Regeln prüfen |
| Regel | mehr Autonomie = mehr schriftliche Leitplanken |

## KI in Softwareprojekten ([03](03-ki-in-softwareprojekten.md))

| Thema | Merkpunkt |
| --- | --- |
| Requirements | KI deckt Lücken auf, das Team entscheidet |
| Konventionen | nur bekannt, wenn sie im Kontext stehen (Modul 4) |

## Sicherheit und Verantwortung ([04](04-sicherheit-und-verantwortung.md))

| Thema | Merkpunkt |
| --- | --- |
| Ownership | verantwortlich ist, wer committet und freigibt |
| Risikoarten | funktionale Fehler, unsichere Muster, Lizenzfragen, Edge Cases |
| Review | konkrete Fragen ("Welches Hash-Verfahren?") statt "sieht gut aus" |
| Grenzwerte | genau an der Grenze testen ("ab 100 €" → Eingabe 100) |
| Urheberrecht | rein KI-generierter Code oft nicht geschützt (§ 2 Abs. 2 UrhG), keine Rechtsberatung |
| Datenschutz | vor der Anfrage prüfen, welcher Kontext mitgeht; nur Beispieldaten |
