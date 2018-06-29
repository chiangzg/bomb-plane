<?php
require_once('./vendor/autoload.php');
use Workerman\Worker;

$worker = new Worker('websocket://0.0.0.0:8000');
$worker->count = 2;

$worker->onConnect = function ($connection) {
	$connection->send("hello");	
};

$worker->onMessage = function ($connection) {
	$connection->send("111");
};

$worker->onClose = function ($connection) {
	echo 'over';
};

Worker::runAll();


