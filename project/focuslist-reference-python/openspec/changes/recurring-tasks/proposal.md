# Proposal

## Why

Wiederkehrende Aufgaben (z. B. "Wochenbericht schreiben") müssen heute nach jedem Abschluss neu angelegt werden.

## What Changes

- Eine Aufgabe kann als `weekly` oder `monthly` wiederkehrend markiert werden.
- Beim Abschließen einer wiederkehrenden Aufgabe legt FocusList automatisch die nächste mit verschobenem Fälligkeitsdatum an.

## Capabilities

### New Capabilities
- `task-recurrence`: Wiederkehrende Aufgaben und automatische Folgeaufgaben.

### Modified Capabilities

## Impact

- `focuslist/models.py` (optionales Feld `recurrence`), `focuslist/actions/complete_task.py`, `focuslist/cli.py`
