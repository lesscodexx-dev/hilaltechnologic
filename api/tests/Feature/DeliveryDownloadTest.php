<?php

namespace Tests\Feature;

use App\Models\Delivery;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DeliveryDownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_delivery_token_expiry_is_enforced(): void
    {
        $order = Order::create([
            'order_number' => 'ORD-EXP',
            'status' => 'PAID',
            'subtotal' => 10000,
            'total' => 10000,
            'currency' => 'IDR',
        ]);

        $delivery = Delivery::create([
            'order_id' => $order->id,
            'token' => 'expired-token',
            'expires_at' => now()->subHour(),
            'download_limit' => 5,
            'download_count' => 0,
        ]);

        $response = $this->getJson('/api/v1/download/'.$delivery->token);

        $response->assertStatus(410);
    }

    public function test_download_limit_is_enforced(): void
    {
        Storage::fake('local');

        $product = Product::create([
            'name' => 'Digital File',
            'slug' => 'digital-file',
            'price' => 10000,
            'currency' => 'IDR',
            'file_path' => 'downloads/file.zip',
            'is_active' => true,
        ]);

        Storage::disk('local')->put('downloads/file.zip', 'content');

        $order = Order::create([
            'order_number' => 'ORD-LIMIT',
            'status' => 'PAID',
            'subtotal' => 10000,
            'total' => 10000,
            'currency' => 'IDR',
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'name' => $product->name,
            'price' => 10000,
            'quantity' => 1,
            'total' => 10000,
        ]);

        $delivery = Delivery::create([
            'order_id' => $order->id,
            'token' => 'limit-token',
            'expires_at' => now()->addHour(),
            'download_limit' => 1,
            'download_count' => 1,
        ]);

        $response = $this->getJson('/api/v1/download/'.$delivery->token);

        $response->assertStatus(429);
    }
}
