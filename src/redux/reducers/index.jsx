import {
  ADD_USER_LOGIN_DETAILS,
  ADD_GENERAL_DETAILS,
  ADD_HOME_FILTER,
  HANDLE_TRIGGER_API_CALLS,
} from "../types";

export default (
  state = {
    userLoginDetails: null,
    generals: null,
    homeFilter: {
      category: null,
      madhab: null,
    },
    apiTriggeres: {
      userGetQuesList: false,
    },
  },
  action
) => {
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
      return {
        ...state,
        homeFilter: action.data,
      };

    case HANDLE_TRIGGER_API_CALLS:
      return {
        ...state,
        apiTriggeres: action.data,
      };

    default:
      return state;
  }
};
