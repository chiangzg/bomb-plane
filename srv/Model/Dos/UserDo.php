<?php

namespace Model\Dos;

/**
 * Class UserDo
 *
 * @author Chiang
 * @since  2018/7/2
 * @email chiangzg@gmail.com
 *
 */
class UserDo
{
    /**
     * @var string room id
     */
    private $roomId = '';

    /**
     * @var string user token
     */
    private $token = '';

    /**
     * @var string
     */
    private $userName = '';

    /**
     * @return string
     */
    public function getRoomId(): string
    {
        return $this->roomId;
    }

    /**
     * @param string $roomId
     *
     * @return UserDo
     */
    public function setRoomId(string $roomId): UserDo
    {
        $this->roomId = $roomId;
        return $this;
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @param string $token
     *
     * @return UserDo
     */
    public function setToken(string $token): UserDo
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @return string
     */
    public function getUserName(): string
    {
        return $this->userName;
    }

    /**
     * @param string $userName
     *
     * @return UserDo
     */
    public function setUserName(string $userName): UserDo
    {
        $this->userName = $userName;
        return $this;
    }
}