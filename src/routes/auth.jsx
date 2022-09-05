import { useNavigate } from "react-router-dom";

const authCheck = () => {
  let loginDatas = localStorage.getItem("LoginDatas");
  if (loginDatas) {
    let jsonData = JSON.parse(loginDatas);
    if (jsonData?.role === "user") {
      return { isUser: true, isAdmin: false };
    } else {
      return { isUser: false, isAdmin: true };
    }
  } else {
    return { isUser: false, isAdmin: false };
  }
};

const authLogout = (cb) => {
  localStorage.removeItem("LoginDatas");
  if (cb) cb();
};

export { authCheck, authLogout };
