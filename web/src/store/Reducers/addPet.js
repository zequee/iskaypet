const reducer = (
  state = {
    pets: [],
    name: "",
    species: "",
    gender: "",
    age: "",
    dateBirth: null,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "ADD_PET_CHANGE_FIELD":
      return { ...state, [action.field]: action.value };

    case "ADD_PET_ON_CANCEL":
      return {
        ...state,
        name: "",
        species: "",
        gender: "masculino",
        age: "",
        dateBirth: null,
      };

    case "REQUEST_START_ADD_PET":
      return { ...state };
    case "SUCCESS_ADD_PET":
      return {
        ...state,
        name: "",
        species: "",
        gender: "masculino",
        age: "",
        dateBirth: null,
      };
    case "FAILURE_ADD_PET":
      return { ...state, error: true };
    default:
      return state;
  }
};
export default reducer;
