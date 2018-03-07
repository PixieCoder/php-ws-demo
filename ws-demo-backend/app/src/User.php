<?php

namespace WsDemo;

class User
{
    public $id;
    public $username;
    public $password;
    public $active;

    public function __construct($username, $id) {
        echo "Created user {$username}\n";
        $this->username = $username;
        $this->id       = $id;
        $this->password = "test";
        $this->active   = TRUE;
    }

    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getHashedPassword() {
        return $this->password;
    }

    public function onLogin() {
        if (!$this->active) {
            return false;
        }

        echo "{$this->username} logged in\n";
    }

    public function onLogout() {
        echo "{$this->username} logged out\n";
    }
}
