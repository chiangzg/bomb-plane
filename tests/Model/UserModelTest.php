<?php

use PHPUnit\Framework\TestCase;

/**
 * Class UserModelTest
 *
 * @author Chiang
 * @since  2018/6/30
 * @email chiangzg@gmail.com
 *
 */
class UserModelTest extends TestCase
{
    /**
     * @var \Model\Db\Database $db
     */
    private $db;

    protected function setUp()
    {
        parent::setUp();
        $this->db = \Model\UserModel::query();
    }

    public function testQuery()
    {
        $this->assertInternalType('int', $this->db->add(1), 'add 返回值不是int');
        $this->assertEquals(1, $this->db->findOne(0));
        $this->assertEquals(1, $this->db->setOne(0, 2), 'setOne 返回值不是oldVal');
        $this->assertEquals(2, $this->db->findOne(0));
        $this->assertNull($this->db->setOne(1, [1, 2]), 'setOne 一个不存在的key返回不是null');
        $this->assertCount(2, $this->db->findAll(), 'findAll 数据条数错误');
        $this->assertEquals(2, $this->db->delete(0), 'delete 返回被删除的value');
        $this->assertTrue($this->db->deleteAll(), 'deleteAll 删除表内容');

        $this->db->add(new stdClass());
        $this->assertTrue($this->db->truncate(), 'truncate');
        $this->assertEmpty($this->db->findAll(), 'truncate 失败');
    }
}
