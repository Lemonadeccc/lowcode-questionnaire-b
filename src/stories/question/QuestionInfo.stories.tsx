import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import Component from "../../components/QuestionComponents/QuestionInfo/Component"

const meta = {
  title: "Question/QuestionInfo",
  component: Component,
  // args: { onClick: fn() },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const SetProps: Story = {
  args: {
    title: "hello",
    desc: "world",
  },
}

export const DescBreakLine: Story = {
  args: {
    title: "hello",
    desc: "a\nb\nc",
  },
}
