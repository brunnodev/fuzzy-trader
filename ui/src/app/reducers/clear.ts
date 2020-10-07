export function clearState(reducer) {
  return function (state, action) {
    return reducer(state, action)
  }
}