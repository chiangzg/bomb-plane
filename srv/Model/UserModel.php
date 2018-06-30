<?php

namespace Model;

use Model\Db\Database;

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
   public static function query()
   {
       return self::getInstance('user');
   }
}