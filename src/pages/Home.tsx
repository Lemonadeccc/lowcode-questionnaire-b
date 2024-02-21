import React, { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "antd"
import { MANAGE_INDEX_PATHNAME } from "../router"
import styles from "./Home.module.scss"
// import '../_mock/index'
// import axios from "axios"

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  // useEffect(() => {
  //   //mock只能劫持xhr不能劫持fetch
  //   // fetch('/api/test').then(res => res.json()).then(data => console.log(data))
  //   axios.get('/api/test').then(res => console.log('axios resData',res.data))
  // } ,[])

  useEffect(() => {
    //server http://localhost:3001/api/test  跨域使用webpack的devserver
    // fetch('/api/test').then(res => res.json()).then(data => console.log('fetch data',data))
    // axios.get('/api/test').then(res => console.log('axios resData',res.data))
  }, [])

  // function clickHandler() {
  //   // nav('/login?b=20')
  //   nav({
  //     pathname: "/login",
  //     search: "b=21",
  //   })
  // }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷90份，收到答卷 980 份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Home
