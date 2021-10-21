import { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

export function useAuthState() {
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [userToken, updateUserToken] = useState("");

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("natural_token");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateUserToken(data);
    }
  }, []);
  useEffect(() => {
    const data = JSON.stringify(userToken);
    window.localStorage.setItem("natural_token", data);
  }, [userToken]);

  return {
    isLoggedIn,
    updateIsLoggedIn,
    userToken,
    updateUserToken,
  };
}

export function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
