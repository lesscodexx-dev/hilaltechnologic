<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\DeliveryController;
use App\Http\Controllers\Api\V1\ManualProofController;
use App\Http\Controllers\Api\V1\MidtransWebhookController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\PortfolioController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{slug}', [ProductController::class, 'show']);

    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{slug}', [PostController::class, 'show']);

    Route::get('portfolios', [PortfolioController::class, 'index']);
    Route::get('portfolios/{slug}', [PortfolioController::class, 'show']);

    Route::middleware('throttle:auth')->group(function () {
        Route::post('auth/register', [AuthController::class, 'register']);
        Route::post('auth/login', [AuthController::class, 'login']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::get('auth/me', [AuthController::class, 'me']);

        Route::get('orders', [OrderController::class, 'index']);
        Route::get('orders/{orderNumber}', [OrderController::class, 'show']);
    });

    Route::post('orders', [OrderController::class, 'store']);
    Route::post('orders/{orderNumber}/pay', [PaymentController::class, 'pay']);
    Route::post('orders/{orderNumber}/manual-proof', [ManualProofController::class, 'store']);

    Route::middleware('throttle:downloads')->group(function () {
        Route::get('deliveries/{token}', [DeliveryController::class, 'show']);
        Route::get('download/{token}', [DeliveryController::class, 'download']);
    });

    Route::post('midtrans/webhook', MidtransWebhookController::class);
});
