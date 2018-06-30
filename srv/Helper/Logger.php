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
        if (DEBUG) {
            self::print('info', $args);
        }
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