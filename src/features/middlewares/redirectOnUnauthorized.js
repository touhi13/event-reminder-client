import { userLoggedOut } from "../auth/authSlice";

export default function redirectOnUnauthorized(store) {
  return (next) => (action) => {
    if (action.payload && action.payload?.status === 401) {
      localStorage.removeItem("auth");
      store.dispatch(userLoggedOut({ accessToken: null, user: null }));
      // window.location.href = "/login";
    } else {
      next(action);
    }
  };
}



