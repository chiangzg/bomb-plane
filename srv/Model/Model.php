<?php

namespace Model;

use Model\Db\Database;
use Model\Db\Memory;
use Model\Db\Redis;

/**
 * Class Model
 *
 * @author Chiang
 * @since  2018/6/30
 * @email chiangzg@gmail.com
 *
 */
abstract class Model
{
    /**
     * @var Database $instance
     */
    private static $instance = null;

    /**
     * @return Database
     */
    protected static function getInstance(string $table): Database
    {
        if (!self::$instance) {
            self::$instance  = DB && DB == 'redis'
                ? new Redis()
                : new Memory($table);
        }

        return self::$instance;
    }

    /**
     * @return $this
     */
    abstract public static function query();
}