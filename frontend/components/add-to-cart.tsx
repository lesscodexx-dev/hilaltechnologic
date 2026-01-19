"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export function AddToCartButton({
  product,
}: {
  product: { id: number; name: string; price: number };
}) {
  const { addItem } = useCart();

  return (
    <Button
      onClick={() =>
        addItem({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      }
    >
      Add to cart
    </Button>
  );
}
