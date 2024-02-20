import React, { FC } from "react"
import {Outlet} from 'react-router-dom'
import styles from './MainLayout.module.scss'

const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout header</div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>MainLayout footer</div>
    </>
  )
}
export default MainLayout
