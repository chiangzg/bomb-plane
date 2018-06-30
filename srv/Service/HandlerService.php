<?php

namespace Srv;

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
        '0' => 'login',
    ];

    /**
     * @return array
     */
    public static function getHandlerCode(): array
    {
        return array_keys(self::HANDLER_CODE);
    }

    /**
     * @param array $data
     *
     * @return string
     */
    public static function onMessage(array $data): string
    {
        return '';
    }

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
}