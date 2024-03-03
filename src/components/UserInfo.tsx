import React, { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LOGIN_PATHNAME } from "../router"
import { getUserInfoService } from "../services/user"
import { useRequest } from "ahooks"
import { UserOutlined } from "@ant-design/icons"
import { Button, message } from "antd"
import { removeToken } from "../utils/user-token"
import useGetUserInfo from "../hooks/useGetUserInfo"
import { useDispatch } from "react-redux"
import { logoutReducer } from "../store/userReducer"

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  //对于已登录的用户显示什么，后续在做

  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}

  const { username, nickname } = useGetUserInfo()

  function logout() {
    dispatch(logoutReducer()) //清空了redux user数据
    removeToken() //清除token的存储
    message.success("退出成功")
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
