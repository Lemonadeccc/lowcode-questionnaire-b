import { useSearchParams } from "react-router-dom"
import { getQuestionListService } from "../services/question"
import { useRequest } from "ahooks"
import { LIST_SEARCH_PARAM_KEY } from "../constant/index"

function useLoadQuestionListData() {
  const [searchParams] = useSearchParams()

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
      const data = await getQuestionListService({ keyword })
      return data
    },
    {
      refreshDeps: [searchParams], //依赖刷新项
    }
  )
  return { data, loading, error }
}

export default useLoadQuestionListData
