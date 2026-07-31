/* eslint-disable react-hooks/set-state-in-effect -- restaurar sesión guardada al montar es intencional */
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // nombre
  const [rol, setRol] = useState(null);         // admin | invitado

  // Restaurar sesión desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("authData");
    if (data) {
      const { usuarioGuardado, rolGuardado } = JSON.parse(data);
      setUsuario(usuarioGuardado);
      setRol(rolGuardado);
    }
  }, []);

  // Login con rol
  const login = (nombreUsuario, tipoRol = "invitado") => {
    const authData = {
      usuarioGuardado: nombreUsuario,
      rolGuardado: tipoRol,
    };

    localStorage.setItem("authData", JSON.stringify(authData));

    setUsuario(nombreUsuario);
    setRol(tipoRol);
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setUsuario(null);
    setRol(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
