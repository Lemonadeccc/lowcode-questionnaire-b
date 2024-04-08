import React, { FC } from "react"
// import { useParams } from "react-router-dom"
// import { getQuestionService } from "../../../services/question"
import useLoadQuestionData from "../../../hooks/useLoadQuestionData"
import EditCanvas from "./EditCanvas"
import { useDispatch } from "react-redux"
import { changeSelectedId } from "../../../store/componentsReducer"
import { useTitle } from "ahooks"
import EditHeader from "./EditHeader"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"
import styles from "./index.module.scss"
import useGetPageInfo from "../../../hooks/useGetPageInfo"

const Edit: FC = () => {
  // const { id = "" } = useParams()

  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelectedId() {
    dispatch(changeSelectedId(""))
  }

  const { title } = useGetPageInfo()
  useTitle(`问卷编辑-${title}`)

  return (
    <div className={styles.container}>
      {/* <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
      {/* <div style={{ backgroundColor: "#fff", height: "40px" }}>
        
      </div> */}
      <EditHeader />
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              {/* <div style={{height:'900px'}}>画布，测试滚动</div>
               */}
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Edit
export {}
