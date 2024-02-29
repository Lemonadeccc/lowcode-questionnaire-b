import React, { FC } from "react"
// import { useParams } from "react-router-dom"
// import { getQuestionService } from "../../../services/question"
import useLoadQuestionData from "../../../hooks/useLoadQuestionData"
import EditCanvas from "./EditCanvas"
import styles from "./index.module.scss"

const Edit: FC = () => {
  // const { id = "" } = useParams()

  const { loading, data } = useLoadQuestionData()

  return (
    <div className={styles.container}>
      {/* <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
      <div style={{ backgroundColor: "#fff", height: "40px" }}>Header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main}>
            <div className={styles["canvas-wrapper"]}>
              {/* <div style={{height:'900px'}}>画布，测试滚动</div>
               */}
              <EditCanvas />
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
}
export default Edit
export {}
