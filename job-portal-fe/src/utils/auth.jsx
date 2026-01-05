export const getUser = () =>
  JSON.parse(localStorage.getItem("user"));

export const getToken = () =>
  localStorage.getItem("jwt");

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
