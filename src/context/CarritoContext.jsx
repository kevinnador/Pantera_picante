import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CarritoContext = createContext();

const STORAGE_KEY = "pantera-picante-carrito";

export const CarritoProvider = ({ children }) => {
  // Cargar carrito desde localStorage
  const [carrito, setCarrito] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    } catch {
      // si falla, no rompemos nada
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        // si ya existe, aumento cantidad
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      // si no existe, lo agrego con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const cantidadTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarProducto,
        cambiarCantidad,
        vaciarCarrito,
        total,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
