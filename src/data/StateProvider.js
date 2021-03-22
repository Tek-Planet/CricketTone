import React, { createContext, useContext, useReducer, useState } from "react";

// Prepares the dataLayer
export const StateContext = createContext();
const mainContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  const [user, setUser] = useState(null)
  return(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
  )
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);

export default mainContext;
