//问卷的多行输入组件
import Component from "./Component"
import PropComponent from "./PropComponent"
import { QuestionTextareaDefaultProps } from "./interface"

export * from "./interface"

//Input 组件的配置
export default {
  title: "多行输入",
  type: "questionTextarea", //要和后端统一好
  Component, //画布显示组件
  PropComponent, //修改属性
  defaultProps: QuestionTextareaDefaultProps,
}
