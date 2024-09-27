"use client";

import { React, createContext, useState } from "react";
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export const AppProvider = ({ session, children }) => {
  const [date, setDate] = useState(new Date());
  const [filtersMenu, setFiltersMenu] = useState(false);
  const [mainContent, setMainContent] = useState("events");

  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
  session: PropTypes.object.isRequired,
};

export default SessionProvider;
