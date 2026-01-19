"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api, type OrderDetail } from "@/lib/api";

export default function OrderDetailPage({ params }: { params: { orderNumber: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getOrder(params.orderNumber)
      .then((response: { data?: OrderDetail }) => setOrder(response.data || null))
      .catch(() => setError("Unable to load order."));
  }, [params.orderNumber]);

  if (error) {
    return <div className="mx-auto max-w-3xl px-6 py-12 text-sm text-text-muted">{error}</div>;
  }

  if (!order) {
    return <div className="mx-auto max-w-3xl px-6 py-12 text-sm text-text-muted">Loading...</div>;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-10">
      <h1 className="text-2xl font-semibold text-text">Order {order.order_number}</h1>
      <Card>
        <div className="text-sm text-text-muted">Status: {order.status}</div>
        <div className="text-sm text-text-muted">Total: IDR {order.total?.toLocaleString?.()}</div>
        {order.delivery?.token ? (
          <div className="mt-4">
            <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/download/${order.delivery.token}`}>
              <Button>Download files</Button>
            </a>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
