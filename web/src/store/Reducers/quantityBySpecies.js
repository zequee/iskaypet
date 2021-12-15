const reducer = (
    state = {
    quantity: [],
      error: false
    },
    action
  ) => {
    switch (action.type) {
      case "REQUEST_START_QUANTITY":
        return { ...state, loading: true };
      case "SUCCESS_QUANTITY":
        return { ...state, quantity: action.pets };
      case "FAILURE_QUANTITY":
        return { ...state, error: true };
      default:
        return state;
    }
  };
  export default reducer;