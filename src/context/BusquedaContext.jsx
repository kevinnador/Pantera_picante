import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const BusquedaContext = createContext();

export const BusquedaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </BusquedaContext.Provider>
  );
};
