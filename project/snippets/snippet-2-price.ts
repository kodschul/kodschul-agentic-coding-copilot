// Prompt: "Berechne den Gesamtpreis eines Warenkorbs. Ab 100 € gibt es 10 % Rabatt."
export interface CartItem {
  price: number; // in Euro
  quantity: number;
}

export function totalPrice(items: CartItem[]): number {
  let sum = 0;
  for (const item of items) {
    sum += item.price * item.quantity;
  }
  return sum > 100 ? sum * 0.9 : sum;
}
