# Recht, Sicherheit & Datenschutz bei KI-generiertem Code

Lab 1.2 klärt, wer verantwortlich ist — dieser Hintergrund vertieft die rechtlichen und datenschutzrelevanten Details dahinter.

## Urheberrecht & Lizenzfragen

| Frage | Kurz-Einordnung |
| --- | --- |
| Gehört generierter Code dem Nutzer? | In den meisten Rechtsordnungen: ja, sofern keine Drittrechte (z. B. Lizenzauflagen aus Trainingsdaten) verletzt werden |
| Kann generierter Code fremde Lizenzauflagen enthalten? | Ja, wenn er nah an lizenziertem Trainingsmaterial reproduziert wird — im Zweifel prüfen, nicht annehmen |

## Haftung

- Verantwortlich ist, wer den Code freigibt und in Produktion bringt (siehe Lab 1.2), unabhängig vom Werkzeug.
- Vertragliche/regulatorische Pflichten (z. B. Produkthaftung) ändern sich nicht dadurch, dass Code AI-unterstützt entstanden ist.

## Privacy-by-Design

```
Anfrage an Copilot
  → welcher Kontext wird mitgesendet? (Dateien, Selektion)
  → enthält dieser Kontext personenbezogene/vertrauliche Daten?
  → falls ja: Kontext einschränken, bevor die Anfrage gestellt wird
```

> **Merksatz:** Bevor eine Datei referenziert wird, prüfen, ob sie personenbezogene oder vertrauliche Daten enthält — nicht danach.

## Praxisregel für diesen Kurs

FocusList verwendet ausschließlich Beispieldaten ohne Personenbezug — diese Regel gilt unabhängig davon auch für reale Projekte nach dem Kurs.

Angewendet in Lab 1.2.
