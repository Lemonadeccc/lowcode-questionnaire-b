import React, { FC } from "react"
import { Outlet } from "react-router-dom"
import styles from "./MainLayout.module.scss"
import { Layout } from "antd"
import Logo from "../components/Logo"
import UserInfo from "../components/UserInfo"

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>问问卷 &copy: 2024 - present. Created by Lemonade</Footer>
    </Layout>
  )
}
export default MainLayout
