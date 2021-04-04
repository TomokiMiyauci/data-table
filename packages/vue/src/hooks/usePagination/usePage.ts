const reducer = (
  state: number,
  action: { type: 'inc' | 'dec' | 'reset' | 'be'; val?: number }
): number => {
  switch (action.type) {
    case 'inc': {
      return state + 1
    }

    case 'dec': {
      return state - 1
    }

    case 'reset': {
      return 1
    }

    case 'be': {
      return action.val!
    }

    default: {
      return state
    }
  }
}

export { reducer }
