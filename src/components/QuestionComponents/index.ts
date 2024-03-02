import { FC } from "react"
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput"
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle"
import QuestionParagraphConf, { QuestionParagraphPropsType } from "./QuestionParagraph"
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo"

//各个组件的Prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType

//组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

//全部的组件配置列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
]

//组件分组
export const componentConfGroup = [
  {
    groupId: "text",
    groupName: "文本显示",
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: "input",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}