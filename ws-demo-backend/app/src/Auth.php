<?php

namespace WsDemo;

use WsDemo\User;

class Auth
{
    protected $users;

    public function __construct() {
        $this->users = [];
    }

    public function login($username, $password) {
        $user = $this->fetchUserByUsername($username);
        if (!$user) {
            $id             = count($this->users);
            $user           = new User($username, $id);
            $user->password = $password;
        }
        elseif ($password !== $user->getHashedPassword()) {
            return NULL;
        }

        return $user;
    }

    public function fetchUserById($id) {
        foreach ($this->users as $user) {
            if ($user->getId() === $id) {
                return $user;
            }
        }
        return NULL;
    }

    public function fetchUserByUsername($username) {
        foreach ($this->users as $user) {
            if ($user->getUsername() === $username) {
                return $user;
            }
        }
        return NULL;
    }
}
