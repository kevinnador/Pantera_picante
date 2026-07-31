/* eslint-disable react-hooks/set-state-in-effect -- la carga inicial de productos vía fetch es intencional */
import { useState, useEffect, createContext, useContext } from 'react';

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 👉 PASO 1: Creá tu proyecto gratis en https://mockapi.io
  // 👉 PASO 2: Agregá un recurso llamado "Productos" con los campos:
  //            nombre (string), precio (number), imagen (string),
  //            descripcion (string), tipo (string)
  // 👉 PASO 3: Pegá acá la URL que te da mockapi (termina en /Productos)
  const API = "https://mockapi.io/clone/690bf8e96ad3beba00f6bbf2/Productos";

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);

      const respuesta = await fetch(API);
      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      const datos = await respuesta.json();
      setProductos(datos);

    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message || "Error al cargar los productos");

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      const nuevoProducto = await respuesta.json();
      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      setProductos([...productos, nuevoProducto]);

    } catch (error) {
      console.error("Error al agregar:", error);
      setError("Hubo un problema al agregar el producto.");
    }
  };

  const editarProducto = async (producto) => {
    try {
      setError(null);

      const respuesta = await fetch(`${API}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      const productoActualizado = await respuesta.json();
      setProductos(productos.map(p =>
        p.id === productoActualizado.id ? productoActualizado : p
      ));

    } catch (error) {
      console.error("Error al editar:", error);
      setError("Hubo un problema al editar el producto.");
    }
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (!confirmar) return;

    try {
      setError(null);

      const respuesta = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) throw new Error("Error al eliminar");

      setProductos(productos.filter(p => p.id !== id));

    } catch (error) {
      console.error(error.message);
      setError("Hubo un problema al eliminar el producto.");
    }
  };

  // Normalización para aceptar singular/plural
  const normalizar = (str) =>
    str?.toLowerCase().trim().replace(/s$/, ""); // elimina la S final

  const getProductosPorTipo = (tipo) => {
    return productos.filter(
      p => normalizar(p.tipo) === normalizar(tipo)
    );
  };

  return (
    <ProductosContext.Provider value={{
      productos,
      cargando,
      error,
      cargarProductos,
      agregarProducto,
      editarProducto,
      eliminarProducto,
      getProductosPorTipo,
    }}>
      {children}
    </ProductosContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useProductosContext = () => useContext(ProductosContext);
