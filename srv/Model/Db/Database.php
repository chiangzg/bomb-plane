<?php

namespace Model\Db;

/**
 * Interface Database
 *
 * @author Jock Jiang
 * @since  2018/6/30
 * @email ***REMOVED***
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