<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Requests\Api\V1\PayOrderRequest;
use App\Http\Resources\Api\V1\PaymentResource;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentController
{
    public function pay(PayOrderRequest $request, string $orderNumber)
    {
        $order = Order::query()->where('order_number', $orderNumber)->firstOrFail();

        if (! in_array($order->status, [OrderStatus::PENDING_PAYMENT->value, OrderStatus::AWAITING_MANUAL_VERIFICATION->value], true)) {
            return response()->json(['message' => 'Order not payable.'], 422);
        }

        $method = $request->validated('method');

        $payment = DB::transaction(function () use ($order, $method) {
            $payment = Payment::create([
                'order_id' => $order->id,
                'method' => $method,
                'status' => PaymentStatus::PENDING->value,
                'amount' => $order->total,
                'payload' => null,
                'provider_reference' => $method === 'midtrans' ? $order->order_number : null,
            ]);

            if ($method === 'manual') {
                $order->update(['status' => OrderStatus::AWAITING_MANUAL_VERIFICATION->value]);
            }

            return $payment;
        });

        $payment->load('manualProof');

        if ($method === 'midtrans') {
            $redirectUrl = rtrim(config('services.midtrans.snap_url'), '/').'/'.$payment->provider_reference;

            return response()->json([
                'payment' => new PaymentResource($payment),
                'redirect_url' => $redirectUrl,
            ]);
        }

        return response()->json([
            'payment' => new PaymentResource($payment),
            'instructions' => [
                'bank' => config('services.midtrans.manual_bank'),
                'account' => config('services.midtrans.manual_account'),
                'name' => config('services.midtrans.manual_name'),
                'notes' => 'Upload proof once the transfer is complete.',
            ],
        ]);
    }
}
