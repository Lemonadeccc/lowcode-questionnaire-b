import { useSearchParams } from "react-router-dom"
import { getQuestionListService } from "../services/question"
import { useRequest } from "ahooks"
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGESIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from "../constant/index"

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY) || "") || LIST_PAGE_SIZE

      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams], //依赖刷新项
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
