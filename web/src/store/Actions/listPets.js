import axios from "../../axios";
import { enqueueError } from "./notification";

const request = () => ({
  type: "REQUEST_START_LIST_PETS",
});

const success = (value) => ({
  type: "SUCCESS_LIST_PETS",
  value,
});

const failure = () => ({
  type: "FAILURE_LIST_PETS",
});

export const requestListPets = () => async (dispatch, getState) => {
  dispatch(request());

  try {
    const response = await axios.get(`/pets`);
    dispatch(success(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(enqueueError("Error al listar las Mascotas"));
    dispatch(failure());
  }
};
