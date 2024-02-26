import React, { FC, useEffect, useState } from "react"
import { Pagination } from "antd"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGESIZE_PARAM_KEY } from "../constant/index"

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  //从url参数找到Page pagesSize，并同步到Pagination中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  //当page pageSize改变时 ，跳转页面（改变url参数）
  const nav = useNavigate()
  const { pathname } = useLocation()
  const handlerPageChange = (page: number, pageSize: number) => {
    console.log("changed", page, pageSize)
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGESIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlerPageChange}
    ></Pagination>
  )
}

export default ListPage
