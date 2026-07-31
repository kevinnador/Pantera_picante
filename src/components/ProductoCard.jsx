import { Link } from "react-router-dom";
import BotonAgregarCarrito from "./BotonAgregarCarrito";

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(precio);

const ProductoCard = ({ producto }) => {

  return (
    <article
      className="
        bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl
        overflow-hidden transition-transform duration-300
        hover:-translate-y-2 hover:shadow-2xl group
      "
    >
      {/* LINK ENVUELVE TODA LA PARTE SUPERIOR */}
      <Link to={`/productos/${producto.id}`}>
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />

          {/* TIPO */}
          <span className="absolute top-3 left-3 bg-neutral-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur">
            {producto.tipo}
          </span>
        </div>

        <div className="px-5 pt-5 flex flex-col gap-3">
          {/* NOMBRE */}
          <h3 className="text-xl font-semibold text-white leading-tight group-hover:text-red-500 transition">
            {producto.nombre}
          </h3>

          {/* PRECIO */}
          <p className="text-[20px] font-bold text-red-500">
            {formatPrice(producto.precio)}
          </p>

          {/* DESCRIPCION */}
          <p className="text-neutral-400 text-sm line-clamp-2">
            {producto.descripcion}
          </p>
        </div>
      </Link>

      {/* BOTONES */}
      <div className="p-5 flex gap-3">
        <Link
          to={`/productos/${producto.id}`}
          className="flex-1 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-white text-center transition"
        >
          Ver detalle
        </Link>

        <BotonAgregarCarrito producto={producto} />

      </div>
    </article>
  );
};

export default ProductoCard;
