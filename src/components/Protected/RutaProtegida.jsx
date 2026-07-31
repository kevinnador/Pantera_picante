import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const RutaProtegida = ({ children, soloAdmin = false }) => {
  const { usuario, rol } = useAuthContext();

  // Si no hay usuario → a login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere ser admin y no lo es → redirige al carrito
  if (soloAdmin && rol !== "admin") {
    return <Navigate to="/carrito" replace />;
  }

  return children;
};

export default RutaProtegida;
