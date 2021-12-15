import axios from "../../axios";
import { enqueueError } from "./notification";

const requestList = () => ({
  type: "REQUEST_START_QUANTITY"
});

const successList = pets => ({
  type: "SUCCESS_QUANTITY",
  pets
});

const failureList = () => ({
  type: "FAILURE_QUANTITY"
});

export const requestQuantityBySpecies = () => async dispatch => {
  dispatch(requestList());
  try {
    const response = await axios.get(`/pets/quantity`);
    dispatch(successList(response.data));
    return response.data;
  } catch (error) {
    dispatch(failureList());
    dispatch(enqueueError("Error al consultar las Cantidades"));
  }
};
