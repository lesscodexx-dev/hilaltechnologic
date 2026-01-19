<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'method' => $this->method,
            'status' => $this->status,
            'amount' => $this->amount,
            'payload' => $this->payload,
            'provider_reference' => $this->provider_reference,
            'manual_proof' => $this->whenLoaded('manualProof', function () {
                return [
                    'id' => $this->manualProof->id,
                    'file_path' => $this->manualProof->file_path,
                    'status' => $this->manualProof->status,
                    'notes' => $this->manualProof->notes,
                ];
            }),
        ];
    }
}
