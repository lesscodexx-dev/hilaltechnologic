<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MidtransWebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_webhook_rejects_invalid_signature(): void
    {
        $response = $this->postJson('/api/v1/midtrans/webhook', [
            'order_id' => 'ORD-TEST',
            'status_code' => '200',
            'gross_amount' => '10000',
            'signature_key' => 'invalid',
        ]);

        $response->assertStatus(401);
    }

    public function test_webhook_updates_payment_and_order_status(): void
    {
        config()->set('services.midtrans.server_key', 'secret');

        $order = Order::create([
            'order_number' => 'ORD-123',
            'status' => OrderStatus::PENDING_PAYMENT->value,
            'subtotal' => 10000,
            'total' => 10000,
            'currency' => 'IDR',
        ]);

        $payment = Payment::create([
            'order_id' => $order->id,
            'method' => 'midtrans',
            'status' => PaymentStatus::PENDING->value,
            'amount' => 10000,
            'provider_reference' => $order->order_number,
        ]);

        $payload = [
            'order_id' => $order->order_number,
            'status_code' => '200',
            'gross_amount' => '10000',
            'transaction_status' => 'settlement',
        ];

        $payload['signature_key'] = hash('sha512', $payload['order_id'].$payload['status_code'].$payload['gross_amount'].'secret');

        $response = $this->postJson('/api/v1/midtrans/webhook', $payload);

        $response->assertOk();
        $this->assertDatabaseHas('payments', [
            'id' => $payment->id,
            'status' => PaymentStatus::SETTLED->value,
        ]);
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => OrderStatus::PAID->value,
        ]);
        $this->assertDatabaseHas('deliveries', [
            'order_id' => $order->id,
        ]);
    }
}
