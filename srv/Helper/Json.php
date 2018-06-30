<?php

namespace Helper;

/**
 * Class Json
 *
 * @author  Chiang
 * @since  2018/6/30
 * @email   chiangzg@gmail.com
 *
 */
class Json
{
    /**
     * @param string $json
     *
     * @return array
     */
    public static function decode(string $json): array
    {
        $ary = json_decode($json, true);
        return $ary ? $ary : [];
    }

    /**
     * @param array $data
     *
     * @return string
     */
    public static function encode(array $data): string
    {
       return json_encode($data);
    }
}