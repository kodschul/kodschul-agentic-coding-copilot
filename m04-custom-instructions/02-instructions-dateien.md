# Instructions-Dateien mit applyTo

Neben der repoweiten Datei gibt es beliebig viele pfadbezogene Instructions-Dateien. Ein Glob-Muster im Kopf (`applyTo`) legt fest, für welche Dateien die Regeln gelten, z. B. nur für Tests.

## Leitfragen

<details>
<summary>Sollen Regeln für Testdateien auch beim Schreiben von Produktionscode gelten?</summary>

Nein. Testregeln (Testrunner, Hilfsfunktionen, Namensschema) würden Produktionscode nur verwässern. Eine eigene Datei mit `applyTo: "tests/**"` hält sie getrennt.

</details>

<details>
<summary>Woran ist erkennbar, ob eine pfadbezogene Datei gegriffen hat?</summary>

An der Liste **Referenzen** unter der Antwort. Passt keine beteiligte Datei zum Muster, fehlt sie dort.

</details>

## Zwei Arten von Instructions-Dateien

| | `copilot-instructions.md` | `*.instructions.md` |
| --- | --- | --- |
| Ablage | `.github/copilot-instructions.md` | `.github/instructions/<name>.instructions.md` |
| Gilt für | jede Chat-Anfrage im Workspace | nur Dateien, deren Pfad zu `applyTo` passt |
| Kopf (Frontmatter) | keiner | `applyTo: "<glob>"`, optional `name`, `description` |
| Typischer Inhalt | Struktur, Architektur, Kernregeln | Regeln für einen Dateityp, z. B. Tests |

Stand: 10/2026, Quelle: https://code.visualstudio.com/docs/copilot/customization/custom-instructions. Der Ordner `.github/instructions/` ist der Standardort; weitere Orte lassen sich über die Einstellung `chat.instructionsFilesLocations` ergänzen.

```text
focuslist/
└── .github/
    ├── copilot-instructions.md          # immer aktiv
    └── instructions/
        └── tests.instructions.md        # nur für Testdateien
```

## applyTo-Muster

| `applyTo`-Wert | Gilt für |
| --- | --- |
| `"**/*.ts"` | alle TypeScript-Dateien |
| `"tests/**/*.test.ts"` | nur Testdateien unter `tests/` |
| `"tests/**/*.py"` | alle Python-Dateien unter `tests/` |
| `"src/models.ts"` | genau eine Datei |
| `"**"` | alle Dateien (wie eine zweite repoweite Datei) |

## Beispiel: tests.instructions.md für FocusList

**JS/TS** ([`steps/m04/.github/instructions/tests.instructions.md`](../project/focuslist/js-ts/steps/m04/.github/instructions/tests.instructions.md)):

```markdown
---
applyTo: "tests/**/*.test.ts"
---

# Testregeln

- Importiere `test` aus `node:test` und `assert` aus `node:assert/strict`.
- Rufe `useTempStore()` aus `tests/helpers.ts` am Dateianfang auf, damit jeder Test eine eigene leere Datei bekommt.
- Ein `test(...)` prüft genau ein Verhalten; der Testname beschreibt es auf Deutsch.
- Fehlerfälle werden mit `assert.throws(() => ..., /Teil der Meldung/)` geprüft.
```

**Python** ([`steps/m04/.github/instructions/tests.instructions.md`](../project/focuslist/python/steps/m04/.github/instructions/tests.instructions.md)):

```markdown
---
applyTo: "tests/**/*.py"
---

# Testregeln

- Tests sind einfache `pytest`-Funktionen ohne Klassen; der Name beschreibt das Verhalten auf Deutsch in snake_case.
- Die Fixture `temp_store` in `tests/conftest.py` gibt jedem Test automatisch eine eigene leere Datei.
- Ein Test prüft genau ein Verhalten.
- Fehlerfälle werden mit `with pytest.raises(ValueError, match="Teil der Meldung"):` geprüft.
```

## Testumgebung, auf die die Testregeln verweisen

Tests dürfen die echte `tasks.json` nicht verändern. Die Hilfsdatei setzt vor jedem Test die Umgebungsvariable `FOCUSLIST_FILE` auf eine leere Datei im Temp-Ordner; die Speicherschicht liest diese Variable ab v1 ([03-regeln-anwenden.md](03-regeln-anwenden.md)).

```ts
// tests/helpers.ts
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeEach } from "node:test";

// Jeder Test bekommt eine eigene, leere tasks.json im Temp-Ordner.
export function useTempStore(): void {
  beforeEach(() => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "focuslist-"));
    process.env.FOCUSLIST_FILE = path.join(dir, "tasks.json");
  });
}
```

```python
# tests/conftest.py
import pytest


@pytest.fixture(autouse=True)
def temp_store(tmp_path, monkeypatch):
    """Jeder Test bekommt eine eigene, leere tasks.json im Temp-Ordner."""
    monkeypatch.setenv("FOCUSLIST_FILE", str(tmp_path / "tasks.json"))
```

## Selbst ausprobieren

Projekt: [`../project/sample-project/`](../project/sample-project/) bzw. [`../project/sample-project-python/`](../project/sample-project-python/), Modus **Agent**, jede Anfrage in einem neuen Chat.

1. Lege `.github/instructions/errors.instructions.md` an mit `applyTo: "**/*.ts"` (Python: `"**/*.py"`) und der Wurf-Regel aus [01-copilot-instructions.md](01-copilot-instructions.md).
2. Stelle die `parsePriority`-Anfrage aus 01 erneut und prüfe **Referenzen**. Verwirf die Änderung.
3. Ändere das Muster auf `applyTo: "src/models.ts"` (Python: `"sample/models.py"`) und wiederhole die Anfrage.

**Erwartete Beobachtung:** In Schritt 2 steht `errors.instructions.md` unter **Referenzen** und die Funktion wirft bei `"urgent"`. In Schritt 3 fehlt die Datei unter **Referenzen**, weil `validators` nicht zum Muster passt; das Fehlerverhalten ist wieder offen.

**Falls es hakt:** Fehlt die Liste **Referenzen**, im Chat fragen: `Welche Instructions-Dateien sind in diesem Workspace aktiv?`

## Fazit

- `.github/instructions/*.instructions.md` gilt nur für Pfade aus `applyTo`.
- Testregeln gehören in eine eigene Datei mit Muster auf `tests/`.
- **Referenzen** unter der Antwort zeigt, welche Dateien gegriffen haben.

Weiter mit [03-regeln-anwenden.md](03-regeln-anwenden.md): FocusList von v0 auf v1 bringen.
