const reducer = (
  state = {
    calc: "",
  },
  action
) => {
  switch (action.type) {
    case "AVG_DESV_PET_CHANGE_FIELD":
      return { ...state, [action.field]: action.value , calc: ""};

    case "REQUEST_START_CALC":
      return { ...state };
    case "SUCCESS_CALC":
      return { ...state, calc: action.value };

    case "FAILURE_CALC":
      return { ...state, error: true };

    default:
      return state;
  }
};
export default reducer;
