import React, { FC, MouseEvent } from "react"
import { Spin } from "antd"
import useGetComponentInfo from "../../../hooks/useGetComponentsInfo"
import { getComponentConfByType } from "../../../components/QuestionComponents/index"
import { ComponentInfoType, changeSelectedId } from "../../../store/componentsReducer"
import { useDispatch } from "react-redux"
import classNames from "classnames"
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress"
import styles from "./EditCanvas.module.scss"

//临时静态展示一下Title Input的效果

// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component"
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component"

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  // console.log('componentList',componentList)
  const dispatch = useDispatch()

  //点击组件，选中
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation() //阻止冒泡
    dispatch(changeSelectedId(id))
  }

  //绑定快捷键
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "" }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked } = c

          //拼接class name
          const wrapperDefaultClassName = styles["component-wrapper"]
          const selectedClassName = styles.selected
          const lockedClassName = styles.locked
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          })

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={e => {
                handleClick(e, fe_id)
              }}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          )
        })}
      {/* <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  )
}

export default EditCanvas
