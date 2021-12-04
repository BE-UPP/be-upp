const DOCTOR_SESSION = "doctor-session";
const isAuthenticated = () => localStorage.getItem(DOCTOR_SESSION) !== null;
const getToken = () => JSON.parse(localStorage.getItem(DOCTOR_SESSION));
const login = session => {
  localStorage.setItem(DOCTOR_SESSION, JSON.stringify(session));
};
const logout = () => {
  localStorage.removeItem(DOCTOR_SESSION);
};

export default {
  isAuthenticated: isAuthenticated,
  getToken: getToken,
  login: login,
  logout: logout,
}