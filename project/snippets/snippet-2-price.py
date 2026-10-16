# Prompt: "Berechne den Gesamtpreis eines Warenkorbs. Ab 100 € gibt es 10 % Rabatt."
from dataclasses import dataclass


@dataclass
class CartItem:
    price: float  # in Euro
    quantity: int


def total_price(items: list[CartItem]) -> float:
    total = sum(item.price * item.quantity for item in items)
    return total * 0.9 if total > 100 else total
