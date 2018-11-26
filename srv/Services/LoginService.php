<?php

namespace Services;

use Helper\Logger;
use Model\Dos\UserDo;
use Model\UserModel;

/**
 * Class LoginService
 *
 * @author  Jock Jiang
 * @since   2018/6/30
 * @email  chiangzg@gmail.com
 * 
 * @package Srv
 */
class LoginService
{
    /**
     * login
     *
     * @param string $token
     *
     * @return array
     */
    public static function login(string $remoteIp, string $id): array
    {
        $token = self::generateToken($remoteIp, $id);
        if (UserModel::query()->findOne($token)) {
            return [true, null];
        }

        $user = new UserDo();
        $user
            ->setToken($token)
            ->setUserName($id);

        try {
            UserModel::addUser($user);
        } catch (\InvalidArgumentException $e) {
            Logger::exception($e);
            return [false, $e->getMessage()];
        }
        return [true, null];
    }

    /**
     * @param string $remoteIp
     * @param string $id
     *
     * @return string
     */
    protected static function generateToken(string $remoteIp, string $id)
    {
        return md5($id . $remoteIp);
    }
}
