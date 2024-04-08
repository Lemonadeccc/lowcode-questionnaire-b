import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Spin, Result, Button } from "antd"
import { useTitle } from "ahooks"
import useLoadQuestionData from "../../../hooks/useLoadQuestionData"
import useGetPageInfo from "../../../hooks/useGetPageInfo"
import ComponentList from "./ComponentList"
import StatHeader from "./StatHeader"
import styles from "./index.module.scss"

const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()

  //状态提升 selectedID type
  const [selectedComponentId, setSelectedComponentId] = useState("")
  const [selectedComponentType, setSelectedComponentType] = useState("")

  useTitle(`问卷统计-${title}`)

  const LoadingElem = (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <Spin></Spin>
    </div>
  )
  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: "1" }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>中间</div>
        <div className={styles.right}>右侧</div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      {loading && LoadingElem}
      {!loading && (
        <div className={styles["content-wrapper"]}>
          <div className={styles.content}> {genContentElem()}</div>
        </div>
      )}
    </div>
  )
}
export default Stat
