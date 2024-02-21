import React, { FC, useState } from "react"
import styles from "./common.module.scss"
import { useTitle } from "ahooks"
import { Empty, Typography, Table, Tag, Button, Space, Modal } from "antd"
// import { stringify } from "querystring"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import ListSearch from "../../components/ListSearch"

const { Title } = Typography
const { confirm } = Modal
const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: "3月10日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: "3月11日 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: false,
    answerCount: 6,
    createdAt: "3月12日 13:23",
  },
]

const Trash: FC = () => {
  useTitle("问问卷 - 我的问卷")
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

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

  function del() {
    confirm({
      title: "确认彻底删除该问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可以找回",
      onOk: () => alert(`删除 ${JSON.stringify(selectedIds)}`),
    })
  }

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
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
        {questionList.length === 0 && <Empty />}
        {questionList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>loadMore 上滑加载更多...</div>
    </>
  )
}
export default Trash
