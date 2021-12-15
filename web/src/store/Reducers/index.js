import { combineReducers } from "redux";
import notification from "./notification";
import addPet from "./addPet"
import listPets from "./listPets";
import quantityBySpecies from "./quantityBySpecies";
import averageDeviation from "./averageDeviation";

export default combineReducers({
  notification,
  addPet,
  listPets,
  quantityBySpecies,
  averageDeviation
});
