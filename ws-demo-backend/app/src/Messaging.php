<?php

namespace WsDemo;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Messaging implements MessageComponentInterface
{
    protected $clients;
    protected $userNum;

    public function __construct() {
        $this->clients = new \SplObjectStorage();
        $this->userNum = 0;
    }

    public function onOpen(ConnectionInterface $conn) {
        ++$this->userNum;
        echo "CONNECT: User number {$this->userNum}\n";
        $this->clients->attach($conn);
        $conn->send(json_encode(
                        [
                            'type' => 'msg',
                            'text' => 'Welcome!',
                            'from' => 'server',
                        ]));
        $this->broadcast(json_encode(
                             [
                                 'type' => 'msg',
                                 'text' => "User number {$this->userNum} has connected!",
                                 'from' => 'server',
                             ]), $conn);
    }

    public function onClose(ConnectionInterface $conn) {
        echo "DISCONNECT: User disconnected\n";
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "ERROR: {$e->getMessage()}\n";
        $this->onClose($conn);
        $conn->close();
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $this->broadcast($msg, $from);
    }

    protected function broadcast($msg, $exclude = NULL) {
        foreach ($this->clients as $client) {
            if ($exclude !== $client) {
                $client->send($msg);
            }
        }
    }
}
