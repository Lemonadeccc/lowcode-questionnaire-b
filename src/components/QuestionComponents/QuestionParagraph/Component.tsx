import React, { FC } from "react"
import { Typography } from "antd"
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from "./interface"

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = "", isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  // console.log('text',text)  //\n
  // const t = text.replaceAll("\n", "<br/>")
  //尽量不要使用dangerouslySetInnerHTML

  const textList = text.split("\n") //['hello','123','456']

  return (
    <Paragraph style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0" }}>
      {/* <span dangerouslySetInnerHTML={{ __html: t }}></span> */}
      {textList.map((t, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {t}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
