import React, {createContext, useState} from 'react';

// Prepares the dataLayer
export const AuthContext = createContext();

// Wrap our app and provide the Data layer
export const AuthProvider = ({children}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userProfile,
        setUserProfile,
        token,
        setToken,
        scores,
        setScores,
        error,
        setError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
