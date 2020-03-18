import React, { createContext, useContext, useState, useEffect } from "react";
import { firebase } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProviderValue = () => useContext(AuthContext);
