"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { api, type OrderSummary } from "@/lib/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .listOrders()
      .then((response: { data?: OrderSummary[] }) => {
        setOrders(response.data || []);
      })
      .catch(() => setError("Please login to view your orders."));
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-sm text-text-muted">{error}</div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Your orders</h1>
      <div className="flex flex-col gap-4">
        {orders?.map((order) => (
          <Link key={order.order_number} href={`/account/orders/${order.order_number}`}>
            <Card className="flex items-center justify-between">
              <span className="text-sm font-medium text-text">{order.order_number}</span>
              <span className="text-xs text-text-muted">{order.status}</span>
              <span className="text-sm text-text">IDR {order.total.toLocaleString()}</span>
            </Card>
          </Link>
        ))}
        {orders?.length === 0 ? (
          <Card>
            <p className="text-sm text-text-muted">No orders yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
