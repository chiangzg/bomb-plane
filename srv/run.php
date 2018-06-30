<?php
require_once('./vendor/autoload.php');

use Helper\Json;
use Helper\Response;
use Srv\HandlerService;
use Workerman\Worker;

define('DEBUG', true);

$worker        = new Worker('websocket://0.0.0.0:8000');
$worker->count = 2;

$worker->onConnect = function ($connection) {
};

$worker->onMessage = function ($connection, $data) {
    $data = Json::decode($data);
    if (!isset($data['code']) || !in_array($data['code'], HandlerService::getHandlerCode())) {
        $connection->send(Response::error());
        $connection->close();
    } else {
        HandlerService::onMessage($connection, $data);
    }
};

$worker->onClose = function ($connection) {
    echo 'over';
};

Worker::runAll();


