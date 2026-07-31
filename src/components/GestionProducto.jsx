import { useState } from "react";
import { useProductosContext } from "../context/ProductoContext";
import FormProducto from "./FormProducto";

// ICONOS
import CirclePlus from "../assets/CirclePlus";
import SquarePen from "../assets/SquarePen";
import TrashIcon from "../assets/TrashIcon";

const GestionProductos = () => {
  const { productos, eliminarProducto } = useProductosContext();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const abrirAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarForm = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  return (
    <section className="min-h-screen bg-[#151313] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-white">
            Gestión de Productos
          </h1>

          <button
            onClick={abrirAgregar}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600
                      text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
          >
            <CirclePlus className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>

        {/* LISTA DE PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-[#221d1a] border border-[#3b3733] p-5 rounded-2xl
                      shadow-lg hover:shadow-xl transition group"
            >
              <div className="flex gap-4">

                {/* FOTO */}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-24 h-24 rounded-xl object-cover border border-[#4a4642]"
                />

                {/* INFO */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition">
                      {producto.nombre}
                    </h3>
                    <p className="text-red-400 text-lg font-semibold">
                      ARS ${producto.precio}
                    </p>
                    <p className="text-neutral-400 text-sm">
                      Tipo: <span className="text-neutral-200 font-medium">{producto.tipo}</span>
                    </p>
                  </div>

                  {/* ACCIONES */}
                  <div className="flex items-center gap-5 mt-4">

                    <button
                      onClick={() => abrirEditar(producto)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>

                  </div>
                </div>

              </div>
            </div>
          ))}

          {productos.length === 0 && (
            <p className="text-center text-neutral-400 text-xl col-span-full">
              No hay productos disponibles
            </p>
          )}
        </div>

        {/* MODAL */}
        {mostrarForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
              <FormProducto
                productoInicial={productoSeleccionado || {}}
                modo={modoFormulario}
                onCerrar={cerrarForm}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default GestionProductos;
