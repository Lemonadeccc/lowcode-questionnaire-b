import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import Component from "../../components/QuestionComponents/QuestionInput/Component"

const meta = {
  title: "Question/QuestionInput",
  component: Component,
} satisfies Meta<typeof Component>
export default meta

export const Default = {
  args: {},
}

export const SetProps = {
  args: {
    title: "Custom title",
    placeholder: "Type here...",
  },
}
