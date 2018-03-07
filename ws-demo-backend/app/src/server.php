<?php

echo "Starting php-server\n";

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\Websocket\WsServer;

use WsDemo\Messaging;
use WsDemo\Auth;

require \dirname(__DIR__) . '/vendor/autoload.php';

$deps = ['auth' => new Auth()];

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Messaging($deps)
        )
    ),
    2345
);

$server->run();
