import axios from "../../axios";
import { enqueueError } from "./notification";

export const AverageDesvPetOnFieldChange = (field, value) => ({
  type: "AVG_DESV_PET_CHANGE_FIELD",
  field,
  value,
});

const requestCalc = () => ({
    type: "REQUEST_START_CALC",
  });
  
  const successCalc = (value) => ({
    type: "SUCCESS_CALC",
    value,
  });
  
  const failureCalc = () => ({
    type: "FAILURE_CALC",
  });
  
  export const calcAv = (specie) => async (dispatch, getState) => {
    dispatch(requestCalc());
    try {
      const response = await axios.get(`/pets/${specie}`);
      dispatch(successCalc(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(enqueueError("Error al Calcular"));
      dispatch(failureCalc());
    }
  };