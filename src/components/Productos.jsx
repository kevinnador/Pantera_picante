import { useProductosContext } from "../context/ProductoContext";
import ProductoCard from "./ProductoCard";

const Productos = ({ lista }) => {
  const { productos, cargando, error } = useProductosContext();

  const productosAMostrar = lista ?? productos;

  if (cargando) return <p className="text-white">Cargando productos...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">

      <h2 className="text-4xl font-bold text-neutral-100 mb-10">
        Nuestros Productos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {productosAMostrar.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>

    </div>
  );
};

export default Productos;
