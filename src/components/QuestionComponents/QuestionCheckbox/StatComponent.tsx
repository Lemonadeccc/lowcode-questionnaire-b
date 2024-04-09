import React, { FC } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { QuestionCheckboxStatPropsType } from "./interface"

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <div style={{ width: "400px", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          {/* <Bar dataKey="uv" fill="#8884d8" />
           */}
          <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
          <XAxis dataKey="name"></XAxis>
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
