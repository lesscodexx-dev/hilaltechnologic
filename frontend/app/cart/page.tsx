"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Cart</h1>
      {items.length === 0 ? (
        <Card>
          <p className="text-sm text-text-muted">Your cart is empty.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Card key={item.product_id} className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-text">{item.name}</div>
                <div className="text-xs text-text-muted">IDR {item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.product_id, Number(event.target.value))}
                  className="w-20"
                />
                <Button variant="ghost" onClick={() => removeItem(item.product_id)}>
                  Remove
                </Button>
              </div>
            </Card>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">Total: IDR {total.toLocaleString()}</span>
            <Link href="/checkout">
              <Button>Continue to checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
