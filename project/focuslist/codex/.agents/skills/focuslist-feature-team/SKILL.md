---
name: focuslist-feature-team
description: Baut ein FocusList-Feature mit der Kette Code-Agent, Test-Agent, Review-Agent als Codex-Subagents. Nur explizit aufrufen mit $focuslist-feature-team <feature oder OpenSpec-Change>.
---

# Feature-Team: Code → Tests → Review

Koordiniere das beim Aufruf genannte Feature in drei Schritten und schreibe selbst keinen Code. Die Subagents sind in `.codex/agents/` definiert. Starte sie nacheinander, nicht parallel, und warte jeweils auf das Ergebnis.

1. **Code:** Starte den Subagent `focuslist_code_agent` mit dem Feature bzw. dem Pfad `openspec/changes/<name>/`.
2. **Tests:** Starte `focuslist_test_agent` für die geänderten Aktionen; er führt `npm test` aus.
3. **Review:** Starte `focuslist_review_agent`.
4. Meldet der Review **Freigabe: nein**, gib die Befunde an `focuslist_code_agent` zurück und wiederhole Schritt 2 und 3. Höchstens zwei Runden.

Fasse am Ende zusammen: geänderte Dateien, Testergebnis, Review-Ergebnis.
