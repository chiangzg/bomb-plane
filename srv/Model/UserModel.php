<?php

namespace Model;

use Model\Db\Database;
use Model\Dos\UserDo;

/**
 * Class UserModel
 *
 * @author  Chiang
 * @since   2018/6/30
 * @email chiangzg@gmail.com
 *
 * @package Model
 */
class UserModel extends Model
{
    /**
     * @return Database
     */
    public static function query(): Database
    {
        return self::getInstance('user');
    }

    /**
     * @param string $token
     *
     * @return mixed
     *
     * @throws \InvalidArgumentException
     */
    public static function addUser(UserDo $user)
    {
        if (!$user->getToken()) {
            throw new \InvalidArgumentException('Token is empty!');
        }
        return self::query()->setOne($user->getToken(), $user);
    }
}