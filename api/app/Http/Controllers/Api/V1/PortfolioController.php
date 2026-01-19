<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController
{
    public function index(Request $request)
    {
        $portfolios = Portfolio::query()
            ->where('is_published', true)
            ->orderByDesc('published_at')
            ->paginate(12);

        return PortfolioResource::collection($portfolios);
    }

    public function show(string $slug)
    {
        $portfolio = Portfolio::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return new PortfolioResource($portfolio);
    }
}
