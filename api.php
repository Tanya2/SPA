<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');
require_once __DIR__ . '/vendor/autoload.php';
use Models\User;
use Models\Operation;
use Models\Database;

$action = 'logout';
$postData = [];
foreach ($_POST as $key => $value) {
    $postData[$key] = htmlspecialchars($value);
}
$getData = [];
foreach ($_GET as $key => $value) {
    $getData[$key] = htmlspecialchars($value);
}
if (!empty($getData['action'])) {
    $action = $getData['action'];
}
if (!empty($postData['action'])) {
    $action = $postData['action'];
}
$info = [
    ['#', 'Сумма', 'Тип', 'Комментарий', '']
];
$user = new User(Database::getInstance());
$operation = new Operation(Database::getInstance());

switch ($action) {
    case 'register':
        try {
            $userId = $user->create($postData);
            echo json_encode([
                'action' => 'info'
            ]);
        } catch (\Throwable $e) {
            echo json_encode([
                'action' => 'register',
                'error' => true,
                'msg' => $e->getMessage()
            ]);
        }
        break;
    case 'login':
        try {
            $userId = $user->getIdByLoginAndPassword($postData);
            $user->updateSessionId($userId);
            echo json_encode([
                'action' => 'info'
            ]);
        } catch (\Throwable $e) {
            echo json_encode([
                'action' => 'login',
                'error' => true,
                'msg' => $e->getMessage()
            ]);
        }
        break;
    case 'add':
        try {
            $userId = $user->getIdBySession();
            $postData['user_id'] = $userId;
            $operation->create($postData);
            $operations = $operation->getOperations($userId);
            $info = array_merge($info, $operations);
            echo json_encode([
                'action' => 'info',
                'table' => $info,
                'total' => $operation->getTotalInfo($userId)
            ]);
        } catch (\Throwable $e) {
            echo json_encode([
                'action' => 'login',
                'error' => true,
                'msg' => $e->getMessage()
            ]);
        }
        break;
    case 'delete':
        try {
            $userId = $user->getIdBySession();
            $postData['user_id'] = $userId;
            $operation->delete($postData);
            $operations = $operation->getOperations($userId);
            $info = array_merge($info, $operations);
            echo json_encode([
                'action' => 'info',
                'table' => $info,
                'total' => $operation->getTotalInfo($userId)
            ]);
        } catch (\Throwable $e) {
            echo json_encode([
                'action' => 'login',
                'error' => true,
                'msg' => $e->getMessage()
            ]);
        }
        break;
    case 'info':
        try {
            $userId = $user->getIdBySession();
            $operations = $operation->getOperations($userId);
            $info = array_merge($info, $operations);
            echo json_encode([
                'action' => 'info',
                'table' => $info,
                'total' => $operation->getTotalInfo($userId)
            ]);
        } catch (\Throwable $e) {
            echo json_encode([
                'action' => 'login',
                'error' => true,
                'msg' => $e->getMessage()
            ]);
        }
        break;
    case 'logout':
        $user->sessionDestroy();
        echo json_encode([
            'action' => 'login'
        ]);
        break;
    default:
        $user->sessionDestroy();
        echo json_encode([
            'action' => 'login'
        ]);
}
