<?php

namespace Services;

use Helper\Logger;
use Helper\Response;
use Workerman\Connection\TcpConnection;

/**
 * Class HandlerService
 *
 * @author  Chiang
 * @since   2018/6/30
 * @email   chiangzg@gmail.com
 *
 * @package Srv
 */
class HandlerService
{
    const HANDLER_CODE = [
        '-1' => 'system error',
        '0'  => 'login',
    ];

    /**
     * @return array
     */
    public static function getHandlerCode(): array
    {
        return array_keys(self::HANDLER_CODE);
    }

    /**
     * @param TcpConnection $connection
     * @param array         $data
     */
    public static function onMessage(TcpConnection $connection, array $data)
    {
        switch ($data['code']) {
            case 0:
                self::login($connection, $data);
                break;
            default:
                $connection->send(Response::error());
                break;
        }
    }

    /**
     * @param TcpConnection $connection
     * @param array         $data
     */
    private static function login(TcpConnection $connection, array $data)
    {
        Logger::debug($data);
        if (empty($data['data']['id'])) {
            $connection->send(Response::error(0, 'username invalid!'));
            $connection->close();
            return;
        }

        $id = $data['data']['id'];
        list($status, $msg) = LoginService::login($connection->getRemoteIp(), $id);
        Logger::debug('login id:%s, status:%d, msg:%s', $id, $status, $msg);
        if ($status) {
            $connection->send(Response::success($data['code']));
        } else {
            $connection->send(Response::error($data['code'], $msg));
        }
    }
}