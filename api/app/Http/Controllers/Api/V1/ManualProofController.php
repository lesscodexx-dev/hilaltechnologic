<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\ManualProofRequest;
use App\Http\Resources\Api\V1\PaymentResource;
use App\Models\Order;
use App\Models\Payment;

class ManualProofController
{
    public function store(ManualProofRequest $request, string $orderNumber)
    {
        $order = Order::query()->where('order_number', $orderNumber)->firstOrFail();

        $payment = Payment::query()
            ->where('order_id', $order->id)
            ->where('method', 'manual')
            ->latest()
            ->firstOrFail();

        $path = $request->file('proof')->store('manual-proofs');

        $payment->manualProof()->updateOrCreate(['payment_id' => $payment->id], [
            'file_path' => $path,
            'status' => 'pending',
        ]);

        $payment->load('manualProof');

        return response()->json([
            'payment' => new PaymentResource($payment),
        ]);
    }
}
