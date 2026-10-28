# Prompt: "Gib die Einträge einer Seite zurück. Seiten beginnen bei 1,
# page_size Einträge pro Seite."
from typing import TypeVar

T = TypeVar("T")


def get_page(items: list[T], page: int, page_size: int) -> list[T]:
    result: list[T] = []
    start = (page - 1) * page_size
    for i in range(start, min(start + page_size - 1, len(items))):
        result.append(items[i])
    return result
