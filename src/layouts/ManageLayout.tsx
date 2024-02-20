import React, { FC } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import styles from "./ManageLayout.module.scss"
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons"
import { Button, Flex, Divider } from "antd"

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Flex gap="small" align="flex-start" vertical>
          <Flex wrap="wrap" gap="small">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              新建问卷
            </Button>
          </Flex>
          <Divider style={{ borderTop: "transparent" }} />
          <Flex wrap="wrap" gap="small">
            <Button
              type={pathname.startsWith("/manage/list") ? "default" : "text"}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => {
                nav("/manage/list")
              }}
            >
              我的问卷
            </Button>
          </Flex>
          <Flex wrap="wrap" gap="small">
            <Button
              type={pathname.startsWith("/manage/star") ? "default" : "text"}
              size="large"
              icon={<StarOutlined />}
              onClick={() => {
                nav("/manage/star")
              }}
            >
              星标问卷
            </Button>
          </Flex>
          <Flex wrap="wrap" gap="small">
            <Button
              type={pathname.startsWith("/manage/trash") ? "default" : "text"}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => {
                nav("/manage/trash")
              }}
            >
              回收站
            </Button>
          </Flex>
        </Flex>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
