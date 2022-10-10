import { ADD_USER_LOGIN_DETAILS } from "../types";

export const addUserLoginDetails = (data) => {
  console.log("Data in Action", data);
  return {
    type: ADD_USER_LOGIN_DETAILS,
    data: data,
  };
};
