<?php

namespace Helper;

/**
 * Class Response
 *
 * @author  Chiang
 * @since   2018/6/30
 * @email   chiangzg@gmail.com
 *
 * @package Helper
 */
class Response
{

    /**
     * @param int    $code
     * @param array  $data
     * @param string $msg
     *
     * @return string
     */
    public static function success(int $code, array $data = null, string $msg = 'ok'): string
    {
        return Json::encode([
            'code'    => $code,
            'status'  => true,
            'message' => $msg,
            'data'    => $data,
        ]);
    }

    /**
     * @param int    $code
     * @param string $msg
     *
     * @return string
     */
    public static function error(int $code = -1, string $msg = 'error'): string
    {
        return Json::encode([
            'code'    => $code,
            'status'  => false,
            'message' => $msg,
            'data'    => null,
        ]);
    }
}