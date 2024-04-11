import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import Component from "../../components/QuestionComponents/QuestionRadio/Component"

const meta = {
  title: "Question/QuestionRadio",
  component: Component,
} satisfies Meta<typeof Component>
export default meta

export const Default = {
  args: {},
}

export const SetProps = {
  args: {
    title: "hello",
    options: [
      { value: "v1", text: "t1" },
      { value: "v2", text: "t2" },
      { value: "v3", text: "t3" },
    ],
    value: "v1",
    isVertical: true,
  },
}
