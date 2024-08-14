<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShortenUrlRequest;
use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UrlController extends Controller
{
    public function shorten(ShortenUrlRequest $request)
    {
        $shortUrl = Str::random(6);
        $url = Url::create([
            'original_url' => $request->url,
            'short_url' => $shortUrl,
            'user_id' => auth('sanctum')->user()->id,
        ]);

        return response()->json($url);
    }

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $items = auth('sanctum')->user()->urls()->paginate($perPage);

        return response()->json([
            'data' => $items->items(),
            'total' => $items->total(),
            'current_page' => $items->currentPage(),
            'per_page' => $items->perPage(),
            'last_page' => $items->lastPage()
        ]);
    }

    public function redirect($shortUrl)
    {
        $url = Url::where('short_url', $shortUrl)->firstOrFail();
        $url->increment('clicks');
        return redirect($url->original_url);
    }
}
