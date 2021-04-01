const reducer = (
  state: number,
  action: { type: 'inc' | 'dec' | 'reset' }
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

    default: {
      return state
    }
  }
}

export { reducer }
