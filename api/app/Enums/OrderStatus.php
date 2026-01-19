<?php

namespace App\Enums;

enum OrderStatus: string
{
    case DRAFT = 'DRAFT';
    case PENDING_PAYMENT = 'PENDING_PAYMENT';
    case AWAITING_MANUAL_VERIFICATION = 'AWAITING_MANUAL_VERIFICATION';
    case PAID = 'PAID';
    case EXPIRED = 'EXPIRED';
    case REFUNDED = 'REFUNDED';
}
