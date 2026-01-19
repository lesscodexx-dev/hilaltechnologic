<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case PENDING = 'PENDING';
    case SETTLED = 'SETTLED';
    case FAILED = 'FAILED';
    case EXPIRED = 'EXPIRED';
}
