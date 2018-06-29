<?php
require_once('./vendor/autoload.php');
use Workerman\Worker;

$worker = new Worker('websocket://0.0.0.0:8000');
$worker->count = 2;

$worker->onConnect = function ($connection) {
};

$worker->onMessage = function ($connection, $data) {
	$data = json_decode($data, true);
	//TODO 测试是否id已经存在，（id、ip做hash）
	if (!$data || empty($data['id'])) {
		$connection->send(json_encode([
			'code' => -1, 
			'message' => '无效身份标识!', 
			'data' => null,
		]));

		$connection->close();
	} else {
		$connection->send(json_encode([
			'code' => 1,
			'message' => 'ok',
			'data' => null,
		]));
	}
};

$worker->onClose = function ($connection) {
	echo 'over';
};

Worker::runAll();


