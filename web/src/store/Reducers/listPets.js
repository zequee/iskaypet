const reducer = (
  state = {
    pets: [],
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_START_LIST_PETS":
      return { ...state };
    case "SUCCESS_LIST_PETS":
      return { ...state, pets: action.value };

    case "FAILURE_LIST_PETS":
      return { ...state, error: true };

    default:
      return state;
  }
};
export default reducer;
