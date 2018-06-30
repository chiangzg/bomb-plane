<?php

namespace Srv;

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
        Logger::info($data);
        if (empty($data['data']['id'])) {
            $connection->send(Response::error(0, 'username invalid!'));
            $connection->close();
        }

        $id = md5($data['data']['id'] . $connection->getRemoteIp());
        Logger::info('%s login token: %s', $connection->getRemoteAddress(), $id);
        list($status, $msg) = LoginService::login($id);
        if ($status) {
            $connection->send(Response::success($data['code']));
        } else {
            $connection->send(Response::error($data['code'], $msg));
        }
    }
}