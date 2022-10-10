import { createStore } from "redux";
import rotateReducer from "./reducers";

function configureStore(state = { userLoginDetails: null }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
