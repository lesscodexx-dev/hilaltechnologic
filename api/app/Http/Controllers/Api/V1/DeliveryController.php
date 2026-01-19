<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\DeliveryResource;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DeliveryController
{
    public function show(string $token)
    {
        $delivery = Delivery::query()
            ->where('token', $token)
            ->firstOrFail();

        return new DeliveryResource($delivery);
    }

    public function download(Request $request, string $token)
    {
        $delivery = Delivery::query()
            ->where('token', $token)
            ->firstOrFail();

        if ($delivery->expires_at->isPast()) {
            return response()->json(['message' => 'Delivery expired.'], 410);
        }

        if ($delivery->download_count >= $delivery->download_limit) {
            return response()->json(['message' => 'Download limit reached.'], 429);
        }

        $item = $delivery->order->items()->with('product')->first();
        $filePath = $item?->product?->file_path;

        if (! $filePath || ! Storage::disk('local')->exists($filePath)) {
            return response()->json(['message' => 'File unavailable.'], 404);
        }

        $delivery->logs()->create([
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $delivery->increment('download_count');

        return Storage::disk('local')->download($filePath);
    }
}
