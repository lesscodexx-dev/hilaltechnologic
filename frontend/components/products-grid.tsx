"use client";

import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
};

export function ProductsGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="flex h-full flex-col gap-4">
          <div className="flex-1">
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-base font-semibold text-text">{product.name}</h3>
            </Link>
            <p className="mt-2 text-sm text-text-muted">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">IDR {product.price.toLocaleString()}</span>
            <Button
              variant="secondary"
              onClick={() =>
                addItem({
                  product_id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                })
              }
            >
              Add
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
