import { LOADING, NO_DATA, NO_SEARCH_RESULT } from '@/constants'

export type TableState = [
  typeof LOADING,
  typeof NO_DATA,
  typeof NO_SEARCH_RESULT
][number]
