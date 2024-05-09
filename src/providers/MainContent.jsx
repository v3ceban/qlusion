/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [mainContent, setMainContent] = useState("events");

  return (
    <MainContext.Provider value={{ mainContent, setMainContent }}>
      {children}
    </MainContext.Provider>
  );
};
