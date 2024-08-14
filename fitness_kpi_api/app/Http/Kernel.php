<?php

use Symfony\Component\HttpKernel\HttpKernel;

class Kernel extends HttpKernel {
  protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
  ];

  protected $middlewareGropus = [
    'web' => [
      \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
      // \Illuminate\Routing\Middleware\ThrottleRequests::class.':web',
      \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
  ];
}
