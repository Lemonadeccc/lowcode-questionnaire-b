import React, { FC, useCallback } from "react"
import { componentConfGroup, ComponentConfType } from "../../../components/QuestionComponents"
import { Typography } from "antd"
import { addComponent } from "../../../store/componentsReducer"
import { useDispatch } from "react-redux"
import { nanoid } from "nanoid"
import styles from "./ComponentLib.module.scss"

const { Title } = Typography

const Lib: FC = () => {
  function GenComponents(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          props: defaultProps,
        })
      )
    }, [])

    // function handleClick() {
    //   dispatch(
    //     addComponent({
    //       fe_id: nanoid(),
    //       title,
    //       type,
    //       props: defaultProps,
    //     })
    //   )
    // }

    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0px" }}>
              {groupName}
            </Title>
            <div>{components.map(c => GenComponents(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
