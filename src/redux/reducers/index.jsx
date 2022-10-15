import { ADD_USER_LOGIN_DETAILS, ADD_GENERAL_DETAILS } from "../types";

export default (state, action) => {
  console.log("state, action in Reducer ====", state, action);

  switch (action.type) {
    case ADD_USER_LOGIN_DETAILS:
      return {
        ...state,
        userLoginDetails: action.data,
      };

    case ADD_GENERAL_DETAILS:
      return {
        ...state,
        generals: action.data,
      };

    default:
      return state;
  }
};
