import { useState } from "react";

export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
};

const STORAGE_KEY = "hilaltechnologic_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  const addItem = (item: CartItem) => {
    const next = [...items];
    const existing = next.find((entry) => entry.product_id === item.product_id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      next.push(item);
    }
    setItems(next);
    writeCart(next);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const next = items.map((item) =>
      item.product_id === productId ? { ...item, quantity } : item
    );
    setItems(next);
    writeCart(next);
  };

  const removeItem = (productId: number) => {
    const next = items.filter((item) => item.product_id !== productId);
    setItems(next);
    writeCart(next);
  };

  const clear = () => {
    setItems([]);
    writeCart([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, addItem, updateQuantity, removeItem, clear, total };
}
