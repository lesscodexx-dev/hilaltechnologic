<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Delivery extends Model
{
    protected $fillable = [
        'order_id',
        'token',
        'expires_at',
        'download_limit',
        'download_count',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'download_limit' => 'integer',
        'download_count' => 'integer',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function logs(): HasMany
    {
        return $this->hasMany(DownloadLog::class);
    }
}
