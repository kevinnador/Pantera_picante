import { useState, useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const BotonAgregarCarrito = ({ producto, className = "" }) => {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [agregado, setAgregado] = useState(false);

  const handleAdd = () => {
    agregarAlCarrito(producto);

    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`
        w-full py-2 rounded-xl font-semibold text-sm transition-all duration-300
        ${agregado
          ? "bg-green-600 text-white"
          : "bg-red-500 text-white hover:bg-red-600"
        }
        ${className}
      `}
    >
      {agregado ? "¡Agregado!" : "Agregar"}
    </button>
  );
};

export default BotonAgregarCarrito;
