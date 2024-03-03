import { useEffect, useState } from "react"
import { useRequest } from "ahooks"
import { useDispatch } from "react-redux"
import useGetUserInfo from "./useGetUserInfo"
import { getUserInfoService } from "../services/user"
import { loginReducer } from "../store/userReducer"

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  //ajax加载信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  //判断当前redux store是否已经存在用户信息
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setWaitingUserData(false) //如果redux store 已经存在永续信息，就不用重新加载了
      return
    }
    run() //如果redux store中没有用户信息，则进行加载
  }, [username])

  return { waitingUserData }
}
export default useLoadUserData
