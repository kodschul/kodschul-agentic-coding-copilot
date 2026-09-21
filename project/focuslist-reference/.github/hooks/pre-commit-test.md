# Pre-Commit-Hook: Tests vor jedem Commit

Führt vor jedem Commit `npm test` aus. Schlägt ein Test fehl, wird der
Commit abgebrochen.

**Umgehung (bewusst dokumentiert, nicht versteckt):** `git commit --no-verify`
überspringt den Hook. Das sollte nur in begründeten Ausnahmefällen genutzt
werden (z. B. Work-in-Progress-Branch), niemals routinemäßig auf `main`.

Der Hook-Quelltext liegt unter [`scripts/git-hooks/pre-commit`](../../scripts/git-hooks/pre-commit)
und wird nach dem Klonen einmalig nach `.git/hooks/pre-commit` verlinkt/kopiert,
da `.git/` selbst nicht versioniert wird.
