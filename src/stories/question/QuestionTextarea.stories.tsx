import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import Component from "../../components/QuestionComponents/QuestionTextArea/Component"

const meta = {
  title: "Question/QuestionTextarea",
  component: Component,
} satisfies Meta<typeof Component>
export default meta

export const Default = { args: {} }

export const SetProps = {
  args: {
    title: "Custom title",
    placeholder: "Type here...",
  },
}
