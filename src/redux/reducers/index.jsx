import {
  ADD_USER_LOGIN_DETAILS,
  ADD_GENERAL_DETAILS,
  ADD_HOME_FILTER,
} from "../types";

export default (
  state = {
    userLoginDetails: null,
    generals: null,
    homeFilter: {
      category: null,
      madhab: null,
    },
  },
  action
) => {
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

    case ADD_HOME_FILTER:
      console.log("action.data IN 222222222222222222222222", action.data);
      return {
        ...state,
        homeFilter: action.data,
      };

    default:
      return state;
  }
};
