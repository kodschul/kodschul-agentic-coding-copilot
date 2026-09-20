# Lab 10.1: Gesamte Versionskette v0 → v7 im Rückblick

Ziel: die Versionskette v0 → v7 zusammenfassend nachvollziehen und benennen können, was sich an der Zusammenarbeit mit AI verändert hat, nicht nur am Code.

**Leitfragen:**

<details>
<summary>Was hat sich zwischen v0 und v7 an der Codequalität verändert?</summary>

Konsistente Fehlerbehandlung, dokumentierte Konventionen, vollständige Testabdeckung, automatisierte Absicherung — alles Ergebnis gezielt eingeführter Leitplanken, nicht eines einzelnen großen Sprungs.

</details>

<details>
<summary>Was hat sich an der Art verändert, wie mit Copilot gearbeitet wurde?</summary>

Von "jede Anfrage einzeln und ungeleitet" (v0) zu "Konventionen, Skills, Prompts, Agents und Specs steuern das Verhalten vorab" (v7) — die Kontrolle verschiebt sich von reaktivem Prüfen zu proaktivem Strukturieren.

</details>

<details>
<summary>Welche Versionsstufe war aus deiner Sicht am wirkungsvollsten?</summary>

Individuelle Antwort — typischerweise Modul 4 (Instructions) als erste, breit wirkende Leitplanke oder Modul 9 (Spec-Driven Dev) als konsequenteste Kontrolle vor der Implementierung.

</details>

## Begriffe & Mentales Modell

- **Versionskette:** v0 (ungeleitet) → v1 (Instructions) → v2 (Skills) → v3 (Prompts) → v4 (Agents) → v5 (Hooks) → v6 (MCP) → v7 (Spec-Driven).
- **Rückblick als Diff-Denken:** nicht nur "was wurde hinzugefügt", sondern "wie hat sich die Interaktion mit Copilot dabei verändert".

## Roter Faden des Rückblicks

- Jede Versionsstufe hat genau eine neue Fähigkeit "angedockt" (siehe Kursagenda-Tabelle).
- Der Trend über alle Stufen: von reinem Vertrauen in Einzelanfragen zu strukturierter, vorab abgesicherter Zusammenarbeit.

## Beispiel

Ein Diff zwischen `complete-task.ts` in v0 (gibt `false` zurück) und v4/v5 (wirft `Error`, ist getestet, durch Pre-Commit-Hook abgesichert) macht den kumulativen Effekt der gesamten Kette an einer einzigen Funktion sichtbar.

**Erwartetes Ergebnis:** der Diff zeigt konkret mehr als nur Stiländerung — er zeigt Testabdeckung und automatisierte Absicherung, die in v0 komplett fehlten.

## Grenzen

Der Rückblick bewertet die Kette dieses Kurses — nicht jedes reale Projekt braucht zwingend alle sieben Stufen in derselben Reihenfolge oder Tiefe.

## Checkpoint & Brücke zur Übung

Checkpoint: Kannst du für mindestens zwei Versionsstufen konkret benennen, was sich an der Zusammenarbeit (nicht nur am Code) verändert hat? Die Übung erstellt dazu einen konkreten Vergleichs-Diff.
