<?php

use Services\LoginService;
use PHPUnit\Framework\TestCase;

/**
 * Class LoginServiceTest
 *
 * @author Chiang
 * @since  2018/7/2
 * @email chiangzg@gmail.com
 *
 */
class LoginServiceTest extends TestCase
{
    public function testLogin()
    {
        list($status, $msg) = LoginService::login('127.0.0.1', 'user1');
        $this->assertTrue($status, 'login return false');

        /* @var \Model\Dos\UserDo $userDo */
        $token = md5('user1' . '127.0.0.1');
        $userDo = \Model\UserModel::query()->findOne($token);
        $this->assertInstanceOf(\Model\Dos\UserDo::class, $userDo);
        $this->assertEquals($token, $userDo->getToken());
    }
}
