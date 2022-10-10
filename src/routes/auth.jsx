const authCheck = () => {
  let loginDatas = localStorage.getItem("@darul-ifta-user-login-details");
  console.log("loginDatas", loginDatas);
  if (loginDatas) {
    let jsonData = JSON.parse(loginDatas);
    if (jsonData?.user_type === "User") {
      return { isUser: true, isAdmin: false };
    } else if (jsonData?.user_type === "admin") {
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
