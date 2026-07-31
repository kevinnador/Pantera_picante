import { Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductoContext";
import BotonAgregarCarrito from "./BotonAgregarCarrito";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const Destacados = () => {
  const { productos, cargando, error } = useProductosContext();

  if (cargando)
    return <p className="text-center text-white">Cargando productos...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;

  // Muestra hasta 6 productos como destacados
  const destacados = productos.slice(0, 6);

  return (
    <section className="w-full bg-[#151313] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white tracking-wide drop-shadow">
            Lo Más Picante
          </h2>
          <p className="text-neutral-300 mt-2">
            Una selección de nuestros productos destacados.
          </p>
        </header>

        {destacados.length === 0 ? (
          <p className="text-center text-neutral-400">
            Todavía no hay productos cargados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {destacados.map((producto) => (
              <div
                key={producto.id}
                className="
                  bg-[#221d1a] rounded-2xl border border-[#3b3733] shadow-xl
                  overflow-hidden group hover:-translate-y-2 hover:shadow-2xl
                  transition-transform duration-300
                "
              >
                <Link to={`/productos/${producto.id}`}>
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="
                        w-full h-full object-cover rounded-2xl
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    />

                    <span
                      className="
                        absolute top-3 left-3 bg-black/70 backdrop-blur
                        text-white text-xs font-semibold px-3 py-1 rounded-full
                      "
                    >
                      {producto.tipo}
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex flex-col gap-3 text-white">
                  <h3 className="text-xl font-bold leading-tight">
                    {producto.nombre}
                  </h3>

                  <p className="text-2xl font-bold text-red-500">
                    {formatPrice(producto.precio)}
                  </p>

                  <p className="text-sm text-neutral-200 line-clamp-2">
                    {producto.descripcion}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <Link
                      to={`/productos/${producto.id}`}
                      className="
                        flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600
                        text-white text-sm font-semibold text-center transition
                      "
                    >
                      Detalle
                    </Link>

                    <BotonAgregarCarrito producto={producto} />

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Destacados;
