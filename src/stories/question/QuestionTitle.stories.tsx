import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import Component from "../../components/QuestionComponents/QuestionTitle/Component"

const meta = {
  title: "Question/QuestionTitle",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const Default = {
  args: {},
}

export const SetProps = {
  args: {
    text: "hello",
    level: 2,
    isCenter: true,
  },
}
