"use client";

import { React, createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  const [filtersMenu, setFiltersMenu] = useState(false);
  const [mainContent, setMainContent] = useState("events");

  return (
    <AppContext.Provider
      value={{
        date,
        setDate,
        filtersMenu,
        setFiltersMenu,
        mainContent,
        setMainContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
