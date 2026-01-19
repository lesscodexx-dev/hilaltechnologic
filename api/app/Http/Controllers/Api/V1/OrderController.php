<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreOrderRequest;
use App\Http\Resources\Api\V1\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::query()
            ->where('user_id', $request->user()->id)
            ->with(['items', 'payments.manualProof', 'delivery'])
            ->orderByDesc('id')
            ->paginate(10);

        return OrderResource::collection($orders);
    }

    public function store(StoreOrderRequest $request)
    {
        $user = $request->user();

        $order = DB::transaction(function () use ($request, $user) {
            $items = collect($request->validated('items'));
            $products = Product::query()
                ->whereIn('id', $items->pluck('product_id'))
                ->get()
                ->keyBy('id');

            $orderNumber = 'ORD-'.strtoupper(Str::random(10));
            $order = Order::create([
                'user_id' => $user?->id,
                'order_number' => $orderNumber,
                'status' => OrderStatus::PENDING_PAYMENT->value,
                'subtotal' => 0,
                'total' => 0,
                'currency' => 'IDR',
                'customer_snapshot' => $request->input('customer'),
            ]);

            $subtotal = 0;
            $items->each(function ($item) use ($order, $products, &$subtotal) {
                $product = $products->get($item['product_id']);
                $price = $product?->price ?? 0;
                $quantity = $item['quantity'];
                $total = $price * $quantity;
                $subtotal += $total;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product?->id,
                    'name' => $product?->name ?? 'Unknown',
                    'price' => $price,
                    'quantity' => $quantity,
                    'total' => $total,
                ]);
            });

            $order->update([
                'subtotal' => $subtotal,
                'total' => $subtotal,
            ]);

            return $order;
        });

        $order->load(['items', 'payments.manualProof', 'delivery']);

        return new OrderResource($order);
    }

    public function show(Request $request, string $orderNumber)
    {
        $order = Order::query()
            ->where('order_number', $orderNumber)
            ->with(['items', 'payments.manualProof', 'delivery'])
            ->firstOrFail();

        $this->authorize('view', $order);

        return new OrderResource($order);
    }
}
