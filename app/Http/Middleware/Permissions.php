<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use function GuzzleHttp\Promise\all;

class Permissions {
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $user = User::userWithRole(Auth::id());
        $role = $user[0]->user_role;
        $allowed_slugs = [];
        if ($role === 1) {
            return $next($request);
        }
        foreach ($user as $slug) {
            $allowed_slugs[$slug->slug] = $slug->slug;
        }
        if (empty($allowed_slugs)) {
            abort(403);
        }
        $isAllowed = Arr::has($allowed_slugs, $request->route()->uri());
        if (!$isAllowed) {
            abort(403);
        }
        return $next($request);
    }
}
