import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import CarritoItem from "./CarritoItem";

const formatearPrecio = (valor) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(valor);

const Carrito = () => {
  const {
    carrito,
    eliminarProducto,
    cambiarCantidad,
    vaciarCarrito,
    total,
    cantidadTotal,
  } = useContext(CarritoContext);

  const [toast, setToast] = useState(null);
  const [mostrarConfirmVaciar, setMostrarConfirmVaciar] = useState(false);

  const mostrarToast = (mensaje, tipo = "info") => {
    setToast({ mensaje, tipo });
    setTimeout(() => setToast(null), 2200);
  };

  const handleEliminar = (id) => {
    eliminarProducto(id);
    mostrarToast("Producto eliminado del carrito", "error");
  };

  const handleVaciar = () => setMostrarConfirmVaciar(true);

  const confirmarVaciar = () => {
    vaciarCarrito();
    setMostrarConfirmVaciar(false);
    mostrarToast("Carrito vaciado", "info");
  };

  const cancelarVaciar = () => setMostrarConfirmVaciar(false);

  const hayProductos = carrito.length > 0;

  return (
    <section className="pt-10 px-6 pb-20 bg-[#f5f3ef] min-h-screen relative overflow-hidden">

      {/* FONDO DECORATIVO */}
      <div className="pointer-events-none absolute -top-40 -left-32 w-96 h-96 rounded-full bg-red-200/30 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-neutral-300/30 blur-[80px]" />

      {/* CONTENIDO CENTRAL */}
      <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LISTA DE PRODUCTOS */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-neutral-200">

          {/* HEADER */}
          <div className="flex justify-between items-center pb-5 border-b">
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
              Tu Carrito
            </h1>

            {hayProductos && (
              <button
                onClick={handleVaciar}
                className="text-sm text-red-500 hover:text-red-700 hover:underline underline-offset-2"
              >
                Vaciar carrito
              </button>
            )}
          </div>

          {/* CARRITO VACÍO */}
          {!hayProductos && (
            <p className="text-center text-neutral-600 mt-10 text-lg">
              Tu carrito está vacío 🛍️
            </p>
          )}

          {/* ITEMS DEL CARRITO */}
          {hayProductos && (
            <ul className="mt-8 space-y-6">
              {carrito.map((item) => (
                <CarritoItem
                  key={item.id}
                  item={item}
                  onEliminar={handleEliminar}
                  onCambiarCantidad={cambiarCantidad}
                />
              ))}
            </ul>
          )}

        </div>

        {/* RESUMEN DEL PEDIDO */}
        {hayProductos && (
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 h-fit border border-neutral-200 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold text-neutral-900 pb-4 border-b">
              Resumen
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700 text-base">
              <div className="flex justify-between">
                <span>Productos ({cantidadTotal})</span>
                <span className="font-semibold">{formatearPrecio(total)}</span>
              </div>

              <div className="flex justify-between">
                <span>Envío</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>

              <div className="pt-5 mt-5 border-t flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span className="text-neutral-900">{formatearPrecio(total)}</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-neutral-900 hover:bg-black text-white font-semibold py-4 rounded-xl transition shadow-md hover:shadow-lg text-lg">
              Finalizar Compra
            </button>

            <p className="mt-4 text-xs text-neutral-500 text-center">
              Podrás elegir método de pago y envío en el próximo paso.
            </p>
          </div>
        )}

      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div
            className={`px-4 py-2 rounded-full shadow-lg text-sm text-white ${
              toast.tipo === "error"
                ? "bg-red-500/95"
                : "bg-neutral-900/95"
            }`}
          >
            {toast.mensaje}
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAR VACIAR */}
      {mostrarConfirmVaciar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              ¿Vaciar carrito?
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Esta acción eliminará todos los productos del carrito.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelarVaciar}
                className="px-4 py-2 rounded-lg text-sm bg-neutral-200 hover:bg-neutral-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarVaciar}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Carrito;
