import axios from "../../axios";
import { enqueueError } from "./notification";
import { enqueueMessageSuccess } from "./notification";

export const addPetOnFieldChange = (field, value) => ({
  type: "ADD_PET_CHANGE_FIELD",
  field,
  value,
});

export const addPetOnCancel = () => ({
  type: "ADD_PET_ON_CANCEL",
});

const requestAddPet = () => ({
  type: "REQUEST_START_ADD_PET",
});

const successAddPet = (user) => ({
  type: "SUCCESS_ADD_PET",
  user,
});

const failureAddPet = () => ({
  type: "FAILURE_ADD_PET",
});

export const addPetOnSave = () => async (dispatch, getState) => {
  dispatch(requestAddPet());
  try {
    const { addPet } = getState();
    const response = await axios.post(`/pets`, {
      data: {
        name: addPet.name,
        species: addPet.species,
        gender: addPet.gender,
        age: addPet.age,
        dateBirth: addPet.dateBirth,
      },
    });

    dispatch(successAddPet(response.data));
    dispatch(enqueueMessageSuccess("La Mascota se guardo correctamente"));
    return response.data;
  } catch (error) {
    dispatch(failureAddPet());
    dispatch(enqueueError("Error al guardar la Mascota"));
  }
};
