<?php

echo "Starting php-server\n";

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\Websocket\WsServer;

use WsDemo\Messaging;

require \dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Messaging()
        )
    ),
    2345
);

$server->run();
