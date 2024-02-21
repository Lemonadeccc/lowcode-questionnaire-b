import React, { FC, useState, ChangeEvent, useEffect } from "react"
import { Button, Input, Select } from "antd"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { LIST_SEARCH_PARAM_KEY } from "../constant"

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState("")
  //获取url参数，丙舍hi知道input value中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
    setValue(curVal)
  }, [searchParams])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function handleSearch(value: string) {
    // nav('/manage/list?keyword=xxx')
    //调换页面，增加url参数
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }

  return (
    <Search
      placeholder="输入关键字"
      allowClear
      size="large"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: "260px" }}
    />
  )
}

export default ListSearch
