import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../context/ProductoContext";
import { CarritoContext } from "../context/CarritoContext";
import { addToCartFeedback } from "../utils/addToCartFeedback";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productos, cargando, error } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => String(p.id) === String(id));

  const addToCart = () => {
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(producto);

    addToCartFeedback(setAgregado);
  };

  const inc = () => setCantidad(cantidad + 1);
  const dec = () => cantidad > 1 && setCantidad(cantidad - 1);

  if (cargando)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-white py-20">
        <p className="text-xl text-red-400 mb-3">Error al cargar producto</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Volver al inicio
        </button>
      </div>
    );

  if (!producto)
    return (
      <div className="text-center text-white py-20">
        <p className="text-xl text-neutral-400 mb-3">
          El producto no existe
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Volver al inicio
        </button>
      </div>
    );

  return (
    <section className="bg-[#151313] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Imagen */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg bg-[#221d1a] rounded-2xl p-4 shadow-xl border border-[#3b3733]">
            <div className="aspect-square overflow-hidden rounded-xl relative">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="text-[#f5efe8] flex flex-col">
          <h1 className="text-4xl font-bold leading-tight mb-4 text-white">
            {producto.nombre}
          </h1>

          {/* Tipo */}
          {producto.tipo && (
            <span className="inline-block bg-black/40 text-xs px-3 py-1 rounded-full mb-4 border border-[#3b3733]">
              {producto.tipo}
            </span>
          )}

          {/* Precio */}
          <p className="text-5xl font-bold text-red-500 mb-8">
            {formatPrice(producto.precio)}
          </p>

          {/* Descripción */}
          <div className="text-neutral-300 leading-relaxed space-y-2">
            {producto.descripcion
              ?.split(".")
              .filter(Boolean)
              .map((linea, index) => (
                <p key={index}>• {linea.trim()}.</p>
              ))}
          </div>

          {/* Cantidad + Botón */}
          <div className="mt-auto border-t border-[#3b3733] pt-6 flex flex-col gap-5">

            {/* Selector cantidad */}
            <div className="flex items-center gap-4">
              <button
                onClick={dec}
                className="w-10 h-10 flex items-center justify-center bg-neutral-700 text-white rounded-full hover:bg-neutral-600 transition text-lg"
              >
                -
              </button>

              <span className="text-2xl font-semibold text-white w-10 text-center">
                {cantidad}
              </span>

              <button
                onClick={inc}
                className="w-10 h-10 flex items-center justify-center bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition text-lg"
              >
                +
              </button>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addToCart}
                className={`flex-1 py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  agregado
                    ? "bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {agregado ? "¡Agregado al carrito!" : "Agregar al Carrito"}
              </button>

              <button
                onClick={() => navigate("/carrito")}
                className="flex-1 py-4 rounded-xl border border-red-500 text-[#f5efe8] hover:bg-[#3b3733] transition font-semibold"
              >
                Ver Carrito
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Botón volver en mobile */}
      <div className="mt-10 lg:hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-neutral-300 flex items-center gap-2 hover:text-white transition"
        >
          ← Volver
        </button>
      </div>
    </section>
  );
};

export default ProductoDetalle;
