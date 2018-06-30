<?php

namespace Model\Db;

/**
 * Class Memory
 *
 * @author Chiang
 * @since  2018/6/30
 * @email chiangzg@gmail.com
 *
 */
class Memory implements Database
{
    /**
     * @var array
     */
    private static $db = [];

    private $table = null;

    public function __construct(string $table)
    {
        $this->table = $table;
    }

    function findAll(): array
    {
        return $this->getTable();
    }

    function findOne($index)
    {
        $table = $this->getTable();
        return $table[$index] ?? null;
    }

    function setOne($index, $value)
    {
        $oldVal = $this->findOne($index);
        $this->setTable($index, $value);
        return $oldVal;
    }

    public function add($value): int
    {
        if (!isset(self::$db[$this->table])) {
            self::$db[$this->table] = [];
        }
        return array_push(self::$db[$this->table], $value);
    }

    function delete($index)
    {
        $value = $this->findOne($index);
        unset(self::$db[$this->table][$index]);
        return $value;
    }

    function deleteAll(): bool
    {
        unset(self::$db[$this->table]);
        return true;
    }

    function truncate(): bool
    {
        self::$db = [];
        return true;
    }

    private function getTable(): array
    {
        return self::$db[$this->table] ?? [];
    }

    private function setTable(string $index, $value)
    {
        self::$db[$this->table][$index] = $value;
    }
}