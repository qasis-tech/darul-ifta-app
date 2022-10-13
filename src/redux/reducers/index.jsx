import { ADD_USER_LOGIN_DETAILS } from "../types";

export default (state, action) => {
  console.log("state, action in Reducer ====", state, action);
  switch (action.type) {
    case ADD_USER_LOGIN_DETAILS:
      return {
        ...state,
        userLoginDetails: action.data,
      };

    default:
      return state;
  }
};
