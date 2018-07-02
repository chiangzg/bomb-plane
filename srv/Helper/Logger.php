<?php

namespace Helper;

/**
 * Class Logger
 *
 * @author  Chiang
 * @since   2018/6/30
 * @email   chiangzg@gmail.com
 *
 * @package Helper
 */
class Logger
{
    public static function info(...$args)
    {
        self::print('Info', $args);
    }

    public static function debug(...$args)
    {
       if (DEBUG) {
           self::print('Debug', $args);
       }
    }

    public static function error(...$args)
    {
        self::print('Error', $args);
    }

    public static function exception(\Exception $e)
    {
        $args = [
            "Message: %s File: %s:%d\nStack:\n%s",
            $e->getMessage(),
            $e->getFile(),
            $e->getLine(),
            $e->getTraceAsString(),
        ];
        self::print('Exception', $args);
    }

    /**
     * @param string $level
     * @param array  $args
     */
    private static function print(string $level, array $args = [])
    {
        if (count($args) == 0) {
            return;
        }

        array_walk($args, function (&$item) {
            if (is_array($item)) {
                $item = json_encode($item);
            }
        });

        $content = sprintf("%s [%s]: %s\n", date('Y-m-d H:i:s'), $level, call_user_func_array('sprintf', $args));
        echo $content;
    }
}