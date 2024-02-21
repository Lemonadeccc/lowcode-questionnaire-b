import React, { FC } from "react"
// import { useSearchParams } from "react-router-dom"
import QuestionCard from "../../components/QuestionCard"
import styles from "./common.module.scss"
import { useTitle } from "ahooks"
import { Typography, Spin } from "antd"
import ListSearch from "../../components/ListSearch"
// import { getQuestionListService } from "../../services/question"
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"

const { Title } = Typography

const List: FC = () => {
  // const [searchParams] = useSearchParams()
  // console.log('keyword',searchParams.get('keyword'))

  useTitle("问问卷 - 我的问卷")

  // const { data = {}, loading } = useRequest(getQuestionListService)
  const { data = {}, loading } = useLoadQuestionListData()
  const { list = [], total = 0 } = data

  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService()
  //     const { list = [], total = 0 } = data
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load()
  // }, [])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多...</div>
    </>
  )
}

export default List
