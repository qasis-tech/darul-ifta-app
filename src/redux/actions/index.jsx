import {
  ADD_USER_LOGIN_DETAILS,
  ADD_GENERAL_DETAILS,
  ADD_HOME_FILTER,
} from "../types";

export const addUserLoginDetails = (data) => {
  return {
    type: ADD_USER_LOGIN_DETAILS,
    data: data,
  };
};

export const addGeneralDetails = (data) => {
  return {
    type: ADD_GENERAL_DETAILS,
    data: data,
  };
};

export const addHomeFilter = (data) => {
  console.log("data in addHomeFilter in ACTION", data);
  return {
    type: ADD_HOME_FILTER,
    data: data,
  };
};

// export const removeItemHomeFilter = (data) => {
//   return {
//     type: ADD_HOME_FILTER,
//     data: data,
//   };
// };
