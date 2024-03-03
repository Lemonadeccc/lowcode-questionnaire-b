import React, { FC, useState } from "react"
import styles from "./common.module.scss"
import { useTitle } from "ahooks"
import { Empty, Typography, Table, Tag, Button, Space, Modal, Spin, message } from "antd"
// import { stringify } from "querystring"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import ListSearch from "../../components/ListSearch"
import ListPage from "../../components/ListPage"
import { useRequest } from "ahooks"
import { updateQuestionService, deleteQuestionService } from "../../services/question"
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle("问问卷 - 我的问卷")
  //记录选中的id
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  //恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 5000, //防抖
      onSuccess() {
        message.success("恢复成功")
        refresh() //手动刷新列表
        setSelectedIds([])
      },
    }
  )

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ]

  //删除
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds)
    },
    {
      manual: true,
      onSuccess() {
        message.success("删除成功")
        refresh()
        setSelectedIds([])
      },
    }
  )

  function del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可以找回",
      onOk: deleteQuestion,
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: selectRowKeys => {
            setSelectedIds(selectRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {!loading && list.length === 0 && <Empty />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}
export default Trash
