import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || null);

  const login = (token) => {
    setAuthToken(token);
    Cookies.set("authToken", token, { expires: 7 }); // Set the cookie to expire in 7 days (adjust as needed)
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove("authToken");
  };

  const isAuthenticated = () => {
    // return !!authToken;
    return true; // Double negation to convert to a boolean
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
