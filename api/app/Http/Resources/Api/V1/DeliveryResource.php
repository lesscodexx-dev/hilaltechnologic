<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'token' => $this->token,
            'expires_at' => $this->expires_at?->toIso8601String(),
            'download_limit' => $this->download_limit,
            'download_count' => $this->download_count,
        ];
    }
}
