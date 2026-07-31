import { useProductosContext } from "../context/ProductoContext";
import ProductoCard from "../components/ProductoCard";

// BANNERS POR CATEGORÍA
const bannerPorCategoria = {
  remeras: {
    titulo: "Remeras",
    descripcion: "Estampas propias y calces pensados para el día a día.",
    imagen: "https://picsum.photos/seed/banner-remeras/1200/500",
  },
  zapatillas: {
    titulo: "Zapatillas",
    descripcion: "Pisada urbana, comodidad real y estilo sin esfuerzo.",
    imagen: "https://picsum.photos/seed/banner-zapatillas/1200/500",
  },
  accesorios: {
    titulo: "Accesorios",
    descripcion: "Los detalles que le dan personalidad a tu outfit.",
    imagen: "https://picsum.photos/seed/banner-accesorios/1200/500",
  },
};

const ProductosCategoria = ({ categoria }) => {
  const { cargando, error, getProductosPorTipo } = useProductosContext();

  // FILTRO DE PRODUCTOS
  const productosFiltrados = getProductosPorTipo(categoria);

  // ESTADOS
  if (cargando)
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-[#f5efe8]">
        Cargando productos...
      </div>
    );

  if (error)
    return (
      <div className="pt-24 text-center text-red-400">
        Error al cargar los productos.
      </div>
    );

  return (
    <section className="bg-[#151313] min-h-screen pb-20">

      {/* BANNER */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden mb-10">
        <img
          src={bannerPorCategoria[categoria]?.imagen}
          alt={categoria}
          className="w-full h-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {bannerPorCategoria[categoria]?.titulo}
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            {bannerPorCategoria[categoria]?.descripcion}
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-4">

        {/* LISTA DE PRODUCTOS */}
        {productosFiltrados.length === 0 ? (
          <p className="text-[#c8b79c] text-lg">
            No hay productos en esta categoría todavía.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </main>
    </section>
  );
};

export default ProductosCategoria;
