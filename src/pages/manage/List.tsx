import React, { FC, useEffect, useState, useRef, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import QuestionCard from "../../components/QuestionCard"
import styles from "./common.module.scss"
import { useTitle, useDebounceFn, useRequest } from "ahooks"
import { Typography, Spin, Empty } from "antd"
import { getQuestionListService } from "../../services/question"
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant/index"
import ListSearch from "../../components/ListSearch"

const { Title } = Typography

const List: FC = () => {
  useTitle("问问卷 - 我的问卷")

  const [started, setStarted] = useState(false) //是否已经开始加载(防抖，有延迟时间)
  const [list, setList] = useState([]) //全部的列表数据，上滑加载更多，累计
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const haveMoreData = total > list.length

  const [searchParams] = useSearchParams() //url参数，虽然没有page pageSize但是有keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""

  //keyword变化时重置信息
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  //真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) //累计
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  //尝试 触发加载 防抖
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem == null) return
      const domRect = elem.getBoundingClientRect()
      if (domRect == null) return
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load() //真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  //1 当页面加载或者url参数keyword变化时，加载
  useEffect(() => {
    tryLoadMore() //加载第一页
  }, [searchParams])
  //2 页面滚动时，加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore)
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore)
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span></span>
  }, [started, loading, haveMoreData])

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
        {/* <div style={{ height: "2000px" }}></div> */}

        {/* {!loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )} */}

        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
