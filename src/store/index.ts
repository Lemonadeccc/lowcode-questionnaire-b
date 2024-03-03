import { configureStore } from "@reduxjs/toolkit"
import undoable, { excludeAction, StateWithHistory } from "redux-undo"
import userReducer, { UserStateType } from "./userReducer"
import componentsReducer, { ComponentsStateType } from "./componentsReducer"
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer/pageInfoReducer"

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentsStateType> //增加了undo之后的类型
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    // //没有undo
    // components: componentsReducer,

    //增加了undo
    components: undoable(componentsReducer, {
      limit: 20, //限制undo 20步
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent",
      ]),
    }),

    //页面信息
    pageInfo: pageInfoReducer,
  },
})
