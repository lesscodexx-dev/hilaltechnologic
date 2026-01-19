<?php

namespace App\Services;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Support\Str;

class DeliveryService
{
    public function createForOrder(Order $order): Delivery
    {
        return Delivery::firstOrCreate(
            ['order_id' => $order->id],
            [
                'token' => Str::uuid()->toString(),
                'expires_at' => now()->addDay(),
                'download_limit' => 5,
                'download_count' => 0,
            ]
        );
    }
}
