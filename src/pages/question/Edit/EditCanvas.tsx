import React, { FC, MouseEvent } from "react"
import { Spin } from "antd"
import useGetComponentInfo from "../../../hooks/useGetComponentsInfo"
import { getComponentConfByType } from "../../../components/QuestionComponents/index"
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from "../../../store/componentsReducer"
import { useDispatch } from "react-redux"
import classNames from "classnames"
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress"
import SortableContainer from "../../../components/DragSortable/SortableContainer"
import SortableItem from "../../../components/DragSortable/SortableItem"
import styles from "./EditCanvas.module.scss"

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

  //SortableContainer 组件的item属性需要每个item要有id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  //拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    // console.log("handleDragEnd", oldIndex, newIndex)

    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
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
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => {
                    handleClick(e, fe_id)
                  }}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
