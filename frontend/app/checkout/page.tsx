"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import { api, bootstrapCsrf } from "@/lib/api";
import { useCart } from "@/lib/cart";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"midtrans" | "manual">("midtrans");
  const [status, setStatus] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<Record<string, string> | null>(null);

  const handleCheckout = async () => {
    setStatus(null);
    setInstructions(null);
    await bootstrapCsrf();
    const order = await api.createOrder({
      items: items.map((item) => ({ product_id: item.product_id, quantity: item.quantity })),
      customer: { name, email },
    });

    const orderNumber = order.data?.order_number;
    if (!orderNumber) {
      setStatus("Unable to create order.");
      return;
    }

    const payment = (await api.payOrder(orderNumber, { method })) as {
      redirect_url?: string;
      instructions?: Record<string, string>;
    };

    if (method === "midtrans" && payment.redirect_url) {
      window.location.href = payment.redirect_url;
      return;
    }

    if (method === "manual") {
      setInstructions(payment.instructions || null);
      clear();
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Checkout</h1>
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Select value={method} onChange={(e) => setMethod(e.target.value as "midtrans" | "manual")}> 
            <option value="midtrans">Midtrans</option>
            <option value="manual">Manual transfer</option>
          </Select>
          <div className="text-sm text-text-muted">Total: IDR {total.toLocaleString()}</div>
        </div>
        <div className="mt-6">
          <Button onClick={handleCheckout} disabled={items.length === 0}>
            Pay now
          </Button>
        </div>
      </Card>
      {status ? <Toast title="Checkout" description={status} /> : null}
      {instructions ? (
        <Card>
          <h2 className="text-base font-semibold text-text">Manual transfer</h2>
          <p className="mt-2 text-sm text-text-muted">Bank: {instructions.bank}</p>
          <p className="text-sm text-text-muted">Account: {instructions.account}</p>
          <p className="text-sm text-text-muted">Name: {instructions.name}</p>
          <p className="mt-2 text-xs text-text-muted">{instructions.notes}</p>
        </Card>
      ) : null}
    </div>
  );
}
