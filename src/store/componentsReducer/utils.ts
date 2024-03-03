import { ComponentInfoType, ComponentsStateType } from "./index"

export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)

  const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ""

  //重新计算selectedId
  let newSelectedId = ""
  let length = visibleComponentList.length
  if (length <= 1) {
    //组件长度就一个，被删除了，就没有组件
    newSelectedId = ""
  } else {
    //组件长度 > 1
    if (index + 1 === length) {
      //要删除的最后一个,就要选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      //要删除伌不是最后一个，删除后，选中最后一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

//插入新组建
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)

  if (index < 0) {
    //未选中任何组件
    draft.componentList.push(newComponent)
  } else {
    //选中了组件 插入到index后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }

  draft.selectedId = newComponent.fe_id
}
