import React, { FC, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import styles from "./Login.module.scss"
import { Typography, Space, Form, Input, Button, Checkbox, message } from "antd"
import { UserAddOutlined } from "@ant-design/icons"
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router"
import { useRequest } from "ahooks"
import { loginService } from "../services/user"
import { setToken } from "../utils/user-token"

const { Title } = Typography

const USERNAME_KEY = "USERNAME"
const PASSWORD_KEY = "PASSWORD"

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = "" } = result
        setToken(token) //存储token
        //存储token
        message.success("成功")
        nav(MANAGE_INDEX_PATHNAME) //导航到我的问卷中去
      },
    }
  )

  const onFinish = (values: any) => {
    console.log(values)
    const { username, password, remember } = values || {}

    run(username, password) //执行ajax

    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  const [form] = Form.useForm() //第三方hook

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined></UserAddOutlined>
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="用户名" name="username">
            <Input></Input>
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password></Input.Password>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }} valuePropName="checked" name="remember">
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }} name="password">
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
