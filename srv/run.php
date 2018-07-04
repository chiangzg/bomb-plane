<?php
require_once('./vendor/autoload.php');

use Helper\Json;
use Helper\Response;
use Services\HandlerService;
use Workerman\Worker;

define('DEBUG', true);
define('DB', 'memory');

$worker        = new Worker('websocket://0.0.0.0:8000');
$worker->count = 2;

$worker->onConnect = function ($connection) {
};

/**
 * @param \Workerman\Connection\TcpConnection $connection
 * @param string $data
 */
$worker->onMessage = function ($connection, $data) {
    $data = Json::decode($data);
    if (!isset($data['code']) || !in_array($data['code'], HandlerService::getHandlerCode())) {
        $connection->send(Response::error());
        $connection->close();
    } else {
        HandlerService::onMessage($connection, $data);
    }
};
/**
 * @param \Workerman\Connection\TcpConnection $connection
 */
$worker->onClose = function ($connection) {
    \Helper\Logger::debug('connection close: %s', $connection->getRemoteAddress());
};

Worker::runAll();


