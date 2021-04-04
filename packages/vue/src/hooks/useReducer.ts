import { computed, ref } from 'vue'

const useReducer = <T>(reducer: any, init: T) => {
  const val = ref<T>(init)
  const valRef = computed(() => val.value)
  const dispatch = (action: any) => {
    val.value = reducer(val.value, action)
  }
  return [valRef, dispatch] as const
}

export { useReducer }
