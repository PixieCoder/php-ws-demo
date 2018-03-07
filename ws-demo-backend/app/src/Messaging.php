<?php

namespace WsDemo;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

use WsDemo\Auth;
use WsDemo\User;

class Messaging implements MessageComponentInterface
{
    protected $clients;
    protected $userNum;
    protected $auth;

    public function __construct($deps) {
        $this->clients = new \SplObjectStorage();
        $this->userNum = 0;
        $this->auth    = $deps['auth'] ? $deps['auth'] : NULL;
        if (!$this->auth) {
            throw new \Error("No authentication mechanism present!");
        }
    }

    public function onOpen(ConnectionInterface $conn) {
        ++$this->userNum;
        echo "CONNECT: User number {$this->userNum}\n";
        $this->clients->attach($conn);
        $this->clients[$conn] = NULL;
        $conn->send(json_encode(
                        [
                            'type' => 'login',
                            'text' => 'Welcome! Please enter username and password',
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
        $decodedMsg = json_decode($msg);
        $fromUser = $this->clients[$from];
        if ($fromUser === NULL && $decodedMsg->type !== 'login') {
            $this->onClose($from);
            $from->close();
            return;
        }
        switch ($decodedMsg->type) {
            case 'login':
                $user = $this->auth->login($decodedMsg->username, $decodedMsg->password);
                if ($user) {
                    $this->clients[$from] = $user;
                    $from->send(json_encode(['type' => 'login',
                                             'text' => 'Success!',
                                             'authenticated' => TRUE]));
                }
                else {
                    // Kill it with fire
                    $this->onClose($from);
                    $from->close();
                }
                break;
            default:
                $decodedMsg->from = $fromUser->getUsername();
                $this->broadcast(json_encode($decodedMsg), $from);
        }
    }

    protected function broadcast($msg, $exclude = NULL) {
        foreach ($this->clients as $client) {
            if ($exclude !== $client
                && $this->clients[$client] !== NULL
                && $this->clients[$client]->active
            ) {
                $client->send($msg);
            }
        }
    }
}
