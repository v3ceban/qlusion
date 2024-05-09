/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filtersMenu, setFiltersMenu] = useState(false);

  return (
    <FiltersContext.Provider value={{ filtersMenu, setFiltersMenu }}>
      {children}
    </FiltersContext.Provider>
  );
};
