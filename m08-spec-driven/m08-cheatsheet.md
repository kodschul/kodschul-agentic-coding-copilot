# Cheatsheet Modul 8: Spec-Driven Development

Stand: 11/2026 (OpenSpec CLI 1.3). Quellen: [OpenSpec (GitHub)](https://github.com/Fission-AI/OpenSpec), [CLI](https://openspec.dev/docs/cli), [Supported tools](https://openspec.dev/docs/supported-tools), [FAQ](https://openspec.dev/docs/faq)

## Wann eine Spec

| Situation | Spec? |
| --- | --- |
| Tippfehler, Farbe, kleine Korrektur | nein, direkter Prompt |
| Feature mit mehreren Dateien und offenen Fragen | ja |
| Verhalten, das andere abnehmen oder nutzen (API, UI-Logik) | ja |
| Unklar, was eigentlich gebaut werden soll | ja, ggf. erst `explore` |

## Ablauf

| Schritt | Wer | Ergebnis |
| --- | --- | --- |
| explore (optional) | Agent + Mensch | Idee geklärt |
| propose | Agent | `openspec/changes/<name>/` |
| prüfen, anpassen, freigeben | Mensch | Change ist der Auftrag |
| apply | `feature-lead` (+ `tester`, `reviewer`) | Code, Tests, Häkchen in `tasks.md` |
| prüfen | Hooks, Reviewer, Playwright-MCP | grüne Tests, Sichtprüfung |
| archive | CLI oder Skill | `changes/archive/JJJJ-MM-TT-<name>/`, Delta in `openspec/specs/` |

## Einrichten

| Befehl | Wirkung |
| --- | --- |
| `npm install -g @fission-ai/openspec@latest` | installieren (Node.js ≥ 22.12) |
| `openspec init --tools github-copilot` | `openspec/`, Skills, Prompt-Dateien anlegen |
| `openspec config set delivery skills` | nur Skills ausliefern (vor `init`) |
| `ls .github/skills` | Namen der OpenSpec-Skills ablesen |

## Was `init` für Copilot anlegt

| Datei | Aufruf | Harness |
| --- | --- | --- |
| `.github/skills/openspec-*/SKILL.md` | `/<skill-name>`, z. B. `/openspec-apply-change`, oder automatisch | Copilot |
| `.github/prompts/opsx-*.prompt.md` | `/opsx-propose` … | nur Local |

## Ordner

| Pfad | Inhalt |
| --- | --- |
| `openspec/config.yaml` | `schema`, `context` (Projektkontext), `rules` je Artefakt |
| `openspec/specs/<capability>/spec.md` | gültige Spec |
| `openspec/changes/<name>/proposal.md` | Why, What Changes, Capabilities, Impact |
| `openspec/changes/<name>/design.md` | Context, Goals / Non-Goals, Decisions, Risks |
| `openspec/changes/<name>/tasks.md` | Checkliste `- [ ]` / `- [x]` |
| `openspec/changes/<name>/specs/<capability>/spec.md` | Delta |
| `openspec/changes/archive/JJJJ-MM-TT-<name>/` | abgeschlossener Change |

## Delta-Format

| Element | Syntax |
| --- | --- |
| Abschnitt | `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, `## RENAMED Requirements` |
| Anforderung | `### Requirement: <Name>`, Text mit SHALL oder MUST |
| Szenario | `#### Scenario: <Name>` |
| Situation / Ergebnis | `- **WHEN** …` / `- **THEN** …` / `- **AND** …` |
| Deutsch | „Das System SHALL …“; „MUSS“ fällt bei `--strict` durch |

## CLI

| Befehl | Wirkung |
| --- | --- |
| `openspec list` | laufende Changes |
| `openspec show <name>` | Change anzeigen |
| `openspec view` | Dashboard |
| `openspec validate <name> --strict` | Format prüfen |
| `openspec archive <name> -y` | archivieren ohne Rückfrage |

## Gute Szenarien

| Merkmal | Beispiel |
| --- | --- |
| Beispielwerte | `2026-02-30` → 400 |
| Grenzfall | heute fällig = nicht überfällig |
| Fehlerfall | ungültiges Datum, nichts gespeichert |
| beobachtbar | „Liste zeigt ‚fällig 20.11.2026‘“ |
| nicht im Umfang | Uhrzeiten, Erinnerungen |

## FocusList v5

| Teil | Python | Node.js |
| --- | --- | --- |
| Logik | `validate_due`, `is_overdue`, `sort_tasks` in `focuslist/tasks.py` | `isValidDate`, `isOverdue`, `sortTasks` in `src/tasks.js` |
| Tests | `tests/test_due.py` | `test/due.test.js` |
| Spec | `openspec/specs/tasks/spec.md` | `openspec/specs/tasks/spec.md` |
| Archiv (Referenz) | `openspec/changes/archive/2026-11-12-add-due-date/` | dito |
