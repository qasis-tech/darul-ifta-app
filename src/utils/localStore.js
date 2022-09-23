export const StoreLocal = async (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
