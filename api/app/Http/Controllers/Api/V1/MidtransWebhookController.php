<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\Payment;
use App\Services\DeliveryService;
use Illuminate\Http\Request;

class MidtransWebhookController
{
    public function __construct(private DeliveryService $deliveryService)
    {
    }

    public function __invoke(Request $request)
    {
        $orderId = $request->input('order_id');
        $statusCode = $request->input('status_code');
        $grossAmount = $request->input('gross_amount');
        $signatureKey = $request->input('signature_key');

        $expectedSignature = hash('sha512', $orderId.$statusCode.$grossAmount.config('services.midtrans.server_key'));

        if (! hash_equals($expectedSignature, $signatureKey)) {
            return response()->json(['message' => 'Invalid signature.'], 401);
        }

        $order = Order::query()->where('order_number', $orderId)->firstOrFail();
        $payment = Payment::query()
            ->where('order_id', $order->id)
            ->where('method', 'midtrans')
            ->latest()
            ->first();

        if (! $payment) {
            return response()->json(['message' => 'Payment not found.'], 404);
        }

        $transactionStatus = $request->input('transaction_status');

        $statusMap = [
            'capture' => PaymentStatus::SETTLED,
            'settlement' => PaymentStatus::SETTLED,
            'pending' => PaymentStatus::PENDING,
            'expire' => PaymentStatus::EXPIRED,
            'deny' => PaymentStatus::FAILED,
            'cancel' => PaymentStatus::FAILED,
        ];

        $paymentStatus = $statusMap[$transactionStatus] ?? PaymentStatus::PENDING;

        $payment->update([
            'status' => $paymentStatus->value,
            'payload' => $request->all(),
        ]);

        if ($paymentStatus === PaymentStatus::SETTLED && $order->status !== OrderStatus::PAID->value) {
            $order->update(['status' => OrderStatus::PAID->value]);
            $this->deliveryService->createForOrder($order);
        }

        if (in_array($paymentStatus, [PaymentStatus::FAILED, PaymentStatus::EXPIRED], true)) {
            $order->update(['status' => OrderStatus::EXPIRED->value]);
        }

        return response()->json(['message' => 'ok']);
    }
}
