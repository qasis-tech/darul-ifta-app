import { ADD_USER_LOGIN_DETAILS, ADD_GENERAL_DETAILS } from "../types";

export const addUserLoginDetails = (data) => {
  return {
    type: ADD_USER_LOGIN_DETAILS,
    data: data,
  };
};

export const addGeneralDetails = (data) => {
  console.log("IN addGeneralDetails", data);
  return {
    type: ADD_GENERAL_DETAILS,
    data: data,
  };
};
