import React, { FC, useState, ChangeEvent, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Typography, Space, Input, message } from "antd"
import { LeftOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons"
import EditToolbar from "./EditToolbar"
import useGetPageInfo from "../../../hooks/useGetPageInfo"
import { changePageTitle } from "../../../store/pageInfoReducer/pageInfoReducer"
import { useDispatch } from "react-redux"
import useGetComponentInfo from "../../../hooks/useGetComponentsInfo"
import { updateQuestionService } from "../../../services/question"
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks"
import styles from "./EditHeader.module.scss"

const { Title } = Typography

//显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()

  const [editState, SetEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => SetEditState(false)}
        onBlur={() => SetEditState(false)}
        onChange={handleChange}
      ></Input>
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => SetEditState(true)}></Button>
    </Space>
  )
}
//保存按钮
const SaveButton: FC = () => {
  //pageInfo componentList的信息
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )

  //快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) save()
  })

  //自动保存(不是定期保存，不是定时器)
  useDebounceEffect(
    () => {
      save()
    },
    [componentList, pageInfo],
    { wait: 1000 }
  )

  return (
    <Button disabled={loading} onClick={save} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

//发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true }) //isPublished标志问卷已经发布
    },
    {
      manual: true,
      onSuccess() {
        message.success("发布成功")
        nav("/question/stat/" + id) //发布成功，跳转到统计页面
      },
    }
  )

  return (
    <Button type="primary" onClick={pub} disabled={loading}>
      发布
    </Button>
  )
}

//编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1)
              }}
            >
              返回
            </Button>
            <TitleElem></TitleElem>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton></PublishButton>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
