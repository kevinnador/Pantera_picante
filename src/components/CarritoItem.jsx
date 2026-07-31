import { useState } from "react";

const CarritoItem = ({ item, onEliminar, onCambiarCantidad }) => {
  const [cantidad, setCantidad] = useState(item.cantidad || 1);

  const handleCantidad = (nuevoValor) => {
    if (nuevoValor < 1) return;
    setCantidad(nuevoValor);
    onCambiarCantidad(item.id, nuevoValor);
  };

  return (
    <li
      className="
        flex flex-col sm:flex-row
        items-center sm:items-start
        gap-4 sm:gap-6
        p-4 rounded-xl border border-neutral-200 bg-white shadow-sm
      "
    >
      {/* Imagen grande en mobile */}
      <img
        src={item.imagen}
        alt={item.nombre}
        className="
          w-28 h-28 sm:w-24 sm:h-24
          object-cover rounded-lg
          border border-neutral-300
          flex-shrink-0
        "
      />

      {/* Info */}
      <div className="flex flex-col flex-1 text-neutral-800 w-full">

        <h3 className="text-lg sm:text-xl font-semibold leading-tight">
          {item.nombre}
        </h3>

        <p className="text-red-600 font-bold text-lg mt-1">
          ${item.precio}
        </p>

        {/* ACCIONES */}
        <div className="mt-3 flex items-center justify-between w-full">

          {/* Cantidad */}
          <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-3 py-1">
            <button
              onClick={() => handleCantidad(cantidad - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-300 hover:bg-neutral-400 text-black"
            >
              -
            </button>

            <span className="text-lg font-medium w-6 text-center">
              {cantidad}
            </span>

            <button
              onClick={() => handleCantidad(cantidad + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white font-bold"
            >
              +
            </button>
          </div>

          {/* Eliminar */}
          <button
            onClick={() => onEliminar(item.id)}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};

export default CarritoItem;
