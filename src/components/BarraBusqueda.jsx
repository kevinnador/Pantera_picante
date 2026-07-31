import { useContext } from "react";
import { BusquedaContext } from "../context/BusquedaContext";
import { useNavigate } from "react-router-dom";

const BarraBusqueda = () => {
  const { busqueda, setBusqueda } = useContext(BusquedaContext);
  const navegar = useNavigate();

  const handleChange = (e) => {
    setBusqueda(e.target.value);

    // Si no estamos en /buscar, nos manda automáticamente
    navegar("/buscar");
  };

  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={busqueda}
      onChange={handleChange}
      style={{
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        width: "250px"
      }}
    />
  );
};

export default BarraBusqueda;
