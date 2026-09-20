# Lab 9.2 – Übung: FocusList v6 → v7 mit OpenSpec

**Ändert die FocusList-Projektbasis?** Ja — finale Versionsstufe: neues Feature per Spec-First-Workflow, plus zwei zusätzliche Beispiel-Specs in früheren Dashboard-Stadien.

## Ausgangslage

FocusList v6 aus Lab 8.4 (MCP-Server angebunden).

## Prerequisites

- OpenSpec-Tooling (oder die dafür vorgesehene Ordnerkonvention `openspec/changes|in-progress|archive`) ist verfügbar.

## Aufgaben

1. Schreibe `openspec/changes/sort-by-due-date/proposal.md` und `spec.md`, inklusive des Randfalls "Aufgabe ohne Fälligkeitsdatum".
2. Reviewe die Spec: ist der Randfall eindeutig geregelt? Ergänze bei Bedarf.
3. Lass `src/actions/sort-by-due-date.ts` aus der Spec generieren und teste sie mit einer gemischten Aufgabenliste (mit/ohne Datum).
4. Verschiebe die Spec nach erfolgreicher Implementierung nach `openspec/archive/sort-by-due-date/` und lege zwei weitere Beispiel-Specs (`in-progress/recurring-tasks/`, `changes/bulk-complete-tasks/`) als Platzhalter für das Dashboard an.

## Checkpoint

- Die Spec regelt den Randfall "kein Fälligkeitsdatum" eindeutig.
- Die generierte Implementierung sortiert eine Testliste mit gemischten Aufgaben korrekt (Aufgaben ohne Datum am Ende).

## Abschlusskriterien

- `sort-by-due-date.ts` ist implementiert, getestet und die zugehörige Spec liegt archiviert vor — das ist FocusList v7, die finale Version.

## Fallback

Falls kein echtes OpenSpec-Tooling verfügbar ist: die drei Ordner (`changes/`, `in-progress/`, `archive/`) manuell als Markdown-Struktur anlegen, ohne Dashboard-Visualisierung — der Spec-First-Ablauf selbst bleibt der Lerninhalt, nicht das Tool.
