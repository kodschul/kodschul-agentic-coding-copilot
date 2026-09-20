# Lab 8.2 – Lösung

## Aufgabe 1: `.git/hooks/pre-commit`

```bash
#!/bin/sh
npm test
```

(ausführbar gemacht via `chmod +x .git/hooks/pre-commit`)

## Aufgabe 2 & 3: Blockierendes Verhalten

Mit einem absichtlich kaputten Test schlägt `npm test` mit Exit-Code ≠ 0 fehl, wodurch Git den Commit abbricht und die Testausgabe anzeigt. Nach Behebung des Tests läuft `npm test` grün durch und der Commit wird abgeschlossen.

## Aufgabe 4: `.github/hooks/pre-commit-test.md`

```markdown
# Pre-Commit-Hook: Tests vor jedem Commit

Führt vor jedem Commit `npm test` aus. Schlägt ein Test fehl, wird der
Commit abgebrochen.

**Umgehung (bewusst dokumentiert, nicht versteckt):** `git commit --no-verify`
überspringt den Hook. Das sollte nur in begründeten Ausnahmefällen genutzt
werden (z. B. Work-in-Progress-Branch), niemals routinemäßig auf `main`.
```
