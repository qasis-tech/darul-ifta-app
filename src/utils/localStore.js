export const StoreLocal = async (key, data, cb) => {
  localStorage.setItem(key, JSON.stringify(data));
  if (cb) cb();
};

export const getLocal = async (key) => {
  const aa = localStorage.getItem(key ? key : "@darul-ifta-user-login-details");
  if (aa) {
    return JSON.parse(aa);
  } else {
    return null;
  }
};
