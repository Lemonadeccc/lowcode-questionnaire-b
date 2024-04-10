import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import Component from "../../components/QuestionComponents/QuestionParagraph/Component"

const meta = {
  title: "Question/QuestionParagraph",
  component: Component,
} satisfies Meta<typeof Component>
export default meta

export const Default = {
  args: {},
}

export const SetProps = {
  args: {
    text: "hello",
    isCenter: true,
  },
}

export const BreakLine = {
  args: {
    text: "hello\nhello\nhello",
  },
}
