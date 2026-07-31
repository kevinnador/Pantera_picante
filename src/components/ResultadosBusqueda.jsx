import { useContext, useState } from "react";
import { BusquedaContext } from "../context/BusquedaContext";
import { useProductosContext } from "../context/ProductoContext";
import ProductoCard from "./ProductoCard";

const ResultadosBusqueda = () => {
  const { busqueda } = useContext(BusquedaContext);
  const { productos } = useProductosContext();

  const termino = busqueda.trim().toLowerCase();

  // Filtrado
  const filtrados =
    termino === ""
      ? productos
      : productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(termino)
        );

  // Paginación
  const porPagina = 3;
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(filtrados.length / porPagina);

  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;

  const productosPagina = filtrados.slice(inicio, fin);

  const siguiente = () => pagina < totalPaginas && setPagina(pagina + 1);
  const anterior = () => pagina > 1 && setPagina(pagina - 1);

  return (
    <section className="bg-[#151313] min-h-screen pt-24 pb-20 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10">
          {termino ? `Resultados para: "${busqueda}"` : "Todos los productos"}
        </h2>

        {filtrados.length === 0 && termino !== "" && (
          <p className="text-center text-white/70 mt-10 text-lg">
            No se encontraron productos para "{busqueda}".
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {productosPagina.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>

        {filtrados.length > porPagina && (
          <div className="flex justify-center gap-4 mt-12">

            <button
              onClick={anterior}
              disabled={pagina === 1}
              className={`
                px-4 py-2 rounded-lg border border-[#3b3733]
                ${pagina === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-[#221d1a]"}
              `}
            >
              ← Anterior
            </button>

            <span className="px-4 py-2 rounded-lg bg-[#221d1a] text-white font-semibold">
              Página {pagina} de {totalPaginas}
            </span>

            <button
              onClick={siguiente}
              disabled={pagina === totalPaginas}
              className={`
                px-4 py-2 rounded-lg border border-[#3b3733]
                ${pagina === totalPaginas ? "opacity-40 cursor-not-allowed" : "hover:bg-[#221d1a]"}
              `}
            >
              Siguiente →
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default ResultadosBusqueda;
