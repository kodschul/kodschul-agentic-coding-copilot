# Cheatsheet Modul 9: Spec-Driven Development

## Ablauf

| Schritt | Ergebnis | Prüffrage |
| --- | --- | --- |
| Proposal | `## Why`, `## What Changes` | Ist das Problem in zwei Sätzen klar? |
| Spec | Requirements mit `SHALL`/`MUST`, je ein `#### Scenario:` mit **WHEN**/**THEN** | Hat jeder Randfall ein eigenes Scenario mit konkreten Werten? |
| Review | Freigabe der Spec | Ist z. B. "kein Fälligkeitsdatum" eindeutig geregelt? |
| Code | Umsetzung aus `tasks.md` | Deckt jeder Test ein Scenario ab? |
| Archiv | Delta in `openspec/specs/` | Stimmen gültige Specs und Code überein? |

## OpenSpec einrichten

| Befehl | Wirkung |
| --- | --- |
| `npm install -g @fission-ai/openspec@latest` | CLI installieren (Node.js ab 20.19, auch im Python-Projekt) |
| `openspec --version` | Version prüfen, getestet: 1.15.0 |
| `openspec init --tools github-copilot --language de --no-copilot-cloud` | `openspec/`, `.github/prompts/opsx-*.prompt.md`, `.github/skills/openspec-*/` anlegen |
| **Developer: Reload Window** | neue `/opsx-*`-Befehle im Chat laden |
| `npx @fission-ai/openspec@latest …` | ohne globale Installation |

## Befehle

| Befehl | Wo | Wirkung |
| --- | --- | --- |
| `/opsx-propose <name: Beschreibung>` | Copilot Chat | Change mit Proposal, Spec-Delta, Design, Tasks; kein Code |
| `/opsx-apply <name>` | Copilot Chat | Tasks umsetzen und abhaken |
| `/opsx-archive <name>` | Copilot Chat | nach `changes/archive/JJJJ-MM-TT-<name>/`, Delta nach `specs/` |
| `/opsx-explore`, `/opsx-update`, `/opsx-sync` | Copilot Chat | Idee durchdenken, Artefakte überarbeiten, Delta ohne Archiv übernehmen |
| `openspec view` | Terminal | Dashboard: Specs, Entwürfe, aktive und abgeschlossene Changes |
| `openspec list` / `openspec list --specs` | Terminal | Changes mit Task-Stand bzw. Specs mit Anzahl Requirements |
| `openspec validate <name>` / `--all` | Terminal | Format prüfen: mindestens ein Delta, jedes Requirement mit Scenario |

## Spec-Delta

| Abschnitt | Wirkung beim Archivieren |
| --- | --- |
| `## ADDED Requirements` | neu in `openspec/specs/<capability>/spec.md` |
| `## MODIFIED Requirements` | ersetzt die gleichnamige Anforderung |
| `## REMOVED Requirements` | entfernt sie |
| `## RENAMED Requirements` | benennt sie um |

## Faustregeln

| Regel | Grund |
| --- | --- |
| Spec vor Code: Proposal und Spec reviewen, erst dann `/opsx-apply` | Randfälle fallen vor der Umsetzung auf |
| Randfälle als eigenes Scenario mit WHEN/THEN | jede Anforderung bleibt prüfbar und wird zu einem Test |
| Fortschritt = Checkboxen in `tasks.md` | `openspec view` liest nur die Checkboxen |
| Archiv pflegt Specs | `/opsx-archive` überführt das Delta in `openspec/specs/` |
| kleine, eindeutige Änderungen ohne Spec | der Aufwand lohnt sich nur bei mehrdeutigen, folgenreichen Features |

_Stand: 10/2026 (OpenSpec 1.15.0), Quelle: [github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)._
