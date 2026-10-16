import re
from datetime import date

from focuslist.models import PRIORITIES


def assert_priority(value: str) -> None:
    if value not in PRIORITIES:
        raise ValueError(f'Ungültige Priorität "{value}". Erlaubt: {", ".join(PRIORITIES)}.')


def assert_iso_date(value: str) -> None:
    try:
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
            raise ValueError
        date.fromisoformat(value)
    except ValueError:
        raise ValueError(f'Ungültiges Datum "{value}". Format: JJJJ-MM-TT.') from None
