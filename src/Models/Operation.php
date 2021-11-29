<?php

namespace Models;

use Interfaces\Db;
use Interfaces\Model;

class Operation implements Model
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
            "SELECT p.*, u.login FROM operation p
            JOIN user u ON u.id = p.user_id WHERE p.id = :id",
            [':id' => $id]
        );
        return empty($data[0]) ? [] : $data[0];
    }
    public function delete($postData)
    {
        if (empty($postData['id'])) {
            throw new \Exception('Id не может быть пустым');
        }
        if (empty($postData['user_id'])) {
            throw new \Exception('Пользователь не определен');
        }
        $this->db->exec(
            "DELETE FROM operation WHERE id = :id AND user_id = :user_id",
            [':id' => $postData['id'], ':user_id' => $postData['user_id']]
        );
    }
    public function getOperations($userId)
    {
        $sql = "SELECT 
                id, amount, IF(`type` = 'expense', 'Расход', 'Доход') as `type`, comment, 'del' AS icon 
            FROM operation           
            WHERE user_id = :user_id ORDER BY id DESC LIMIT 10";
        $data = $this->getData($sql, [':user_id' => $userId]);
        $returnData = [];
        foreach ($data as $row) {
            $returnData[] = array_values($row);
        }
        return $returnData;
    }
    public function getTotalInfo($userId)
    {
        $sql = "SELECT 
                CONCAT('Сумма всех расходов: ', IFNULL(SUM(IF('expense' = `type`, `amount`, 0)), 0)) AS expense,
                CONCAT('Сумма всех приходов: ', IFNULL(SUM(IF('income' = `type`, `amount`, 0)), 0)) AS income
            FROM operation           
            WHERE user_id = :user_id";
        $data = $this->getData($sql, [':user_id' => $userId]);
        return [$data[0]['expense'], $data[0]['income']];
    }
    public function create($postData): int
    {
        if (empty($postData['amount'])) {
            throw new \Exception('Сумма не может быть пустой');
        }
        if (empty($postData['type'])) {
            throw new \Exception('Тип не может быть пустым');
        }
        if (empty($postData['comment'])) {
            throw new \Exception('Комментарий не может быть пустым');
        }
        if (empty($postData['user_id'])) {
            throw new \Exception('Пользователь не определен');
        }
        $postData['type'] = ('Расход' == $postData['type']) ? 'expense' : 'income' ;
        $this->db->exec(
            "INSERT INTO operation (id, amount, `type`, user_id, comment) VALUES (NULL, :amount, :type, :user_id, :comment)",
            [
                ':amount' => $postData['amount'],
                ':type' => $postData['type'],
                ':user_id' => $postData['user_id'],
                ':comment' => $postData['comment']
            ]
        );
        return $this->db->getLastInsertId();
    }
}
