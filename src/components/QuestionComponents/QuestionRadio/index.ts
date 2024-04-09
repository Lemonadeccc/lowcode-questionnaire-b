//问卷radio组件

import Component from "./Component"
import { QuestionRadioDefaultProps } from "./interface"
import StatComponent from "./StatComponent"
import PropComponent from "./PropComponent"

export * from "./interface"

export default {
  title: "单选",
  type: "questionRadio",
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent,
}
