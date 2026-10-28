from focuslist.models import PRIORITIES


def assert_priority(value: str) -> None:
    if value not in PRIORITIES:
        raise ValueError(f'Ungültige Priorität "{value}". Erlaubt: {", ".join(PRIORITIES)}.')
