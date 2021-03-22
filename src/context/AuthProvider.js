import React, { createContext, useState } from "react";
 
// Prepares the dataLayer
export const AuthContext = createContext();

// Wrap our app and provide the Data layer
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  return(
    <AuthContext.Provider value={{
      user,
      setUser,
      token,
      setToken
    }}>
    {children}
  </AuthContext.Provider>
  )
};

