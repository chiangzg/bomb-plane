<?php

namespace Model\Db;

/**
 * Interface Database
 *
 * @author Jock Jiang
 * @since  2018/6/30
 * @email chiangzg@gmail.com
 *
 */
interface Database
{
    /**
     * @return array
     */
    function findAll(): array;

    /**
     * @param mixed  $index
     *
     * @return mixed
     */
    function findOne($index);

    /**
     * @param        $index
     * @param        $value
     *
     * @return mixed
     */
    function setOne($index, $value);

    /**
     * @param $value
     *
     * @return int
     */
    function add($value): int;

    /**
     * @param        $index
     *
     * @return mixed
     */
    function delete($index);

    /**
     * @return bool
     */
    function deleteAll(): bool;

    /**
     * @return bool
     */
    function truncate(): bool;
}
