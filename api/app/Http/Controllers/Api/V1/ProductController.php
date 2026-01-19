<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->where('is_active', true)
            ->orderBy('id', 'desc')
            ->paginate(12);

        return ProductResource::collection($products);
    }

    public function show(string $slug)
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return new ProductResource($product);
    }
}
