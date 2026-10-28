# Design

- Umsetzung nach dem Skill `bulk-priority-update`: erst alle ids auflösen, dann einmal `writeTasks` aufrufen.
- Umgesetzt mit dem Skill `focuslist-feature-team`: Subagent `focuslist_code_agent` schreibt `complete-tasks.ts`, `focuslist_test_agent` die Tests, `focuslist_review_agent` gibt frei.
