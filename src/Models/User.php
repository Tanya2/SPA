<?php

namespace Models;

use Interfaces\Db;
use Interfaces\Model;

class User implements Model
{
    private $db;
    public function __construct(Db $db)
    {
        $this->db = $db;
    }
    public function getData($sql, $params = [])
    {
        return $this->db->getData($sql, $params);
    }
    public function getById($id)
    {
        $data = $this->db->getData(
            "SELECT * FROM user WHERE id = :id",
            [':id' => $id]
        );
        return $data[0];
    }
    public function getIdByLoginAndPassword($postData)
    {
        $this->validate($postData);
        $data = $this->getData(
            "SELECT id FROM user WHERE login = :login AND password = :password",
            [':login' => $postData['login'], ':password' =>  $this->getPassword($postData['password'])]
        );

        return empty($data[0]['id']) ? 0 : $data[0]['id'];
    }
    public function getIdBySession()
    {
        $this->sessionStart();
        $sessionId = session_id();
        $data = $this->getData(
            "SELECT id FROM user WHERE session_id = :session_id",
            [':session_id' => $this->getSessionKey($sessionId)]
        );
        if (empty($data[0]['id'])) {
            throw new \Exception('Пользователь не авторизирован');
        }
        return $data[0]['id'];
    }
    public function updateSessionId($userId)
    {
        $this->sessionStart();
        $sessionId = session_id();
        $this->db->exec(
            "UPDATE `user` SET `session_id` = :session_id WHERE `user`.`id` = :id",
            [':id' => $userId,  ':session_id' => $this->getSessionKey($sessionId)]
        );
        return $this->getIdBySession();

    }
    public function create($postData): int
    {
        $this->validate($postData);
        $data = $this->getData(
            "SELECT id FROM user WHERE login = :login ",
            [':login' => $postData['login']]
        );
        if (!empty($data[0]['id'])) {
            throw new \Exception('Пользователь с таким логином существует');
        }

        $this->sessionStart();
        $sessionId = session_id();
        $this->db->exec(
            "INSERT INTO user(id, login, password, session_id) VALUES (NULL, :login, :password, :session_id)",
            [
                ':login' => $postData['login'],
                ':password' => $this->getPassword($postData['password']),
                ':session_id' => $this->getSessionKey($sessionId)
            ]
        );
        return $this->db->getLastInsertId();
    }
    private function sessionStart()
    {
        if (!isset($_SESSION))
        {
            session_start();
        }
    }
    public function sessionDestroy()
    {
        if (isset($_SESSION))
        {
            session_destroy();
            $_SESSION = [];
        }
    }
    private function getPassword($password)
    {
        return md5($password . 'password');
    }
    private function getSessionKey($key)
    {
        return md5($key . 'key');
    }
    private function validate($postData)
    {
        if (empty($postData['login'])) {
            throw new \Exception('Логин не может быть пустым');
        }
        if (empty($postData['password'])) {
            throw new \Exception('Пароль не может быть пустым');
        }
    }
}
