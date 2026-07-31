import { useState } from "react";
import { useProductosContext } from "../context/ProductoContext";
import X from "../assets/X";

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto } = useProductosContext();

  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    modo === "agregar"
      ? await agregarProducto(producto)
      : await editarProducto(producto);
    onCerrar();
  };

  return (
    <div className="w-full animate-fadeIn">
      <div className="
        bg-white rounded-2xl shadow-2xl p-8
        border border-neutral-200
        max-h-[90vh] overflow-y-auto
      ">

        {/* HEADER */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-2xl font-bold text-neutral-900">
            {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
          </h3>

          <button
            onClick={onCerrar}
            className="p-2 rounded-lg hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={manejarSubmit}
          className="space-y-6 mt-6"
        >

          {/* CAMPO */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Nombre del Producto
            </label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre || ""}
              onChange={manejarChange}
              required
              className="
                w-full px-4 py-3 rounded-xl border border-neutral-300
                focus:ring-2 focus:ring-red-500 focus:border-red-500
                transition bg-neutral-50 hover:bg-neutral-100
              "
              placeholder="Ej: Remera oversize negra"
            />
          </div>

          {/* PRECIO */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Precio (ARS)
            </label>
            <input
              type="number"
              name="precio"
              value={producto.precio || ""}
              onChange={manejarChange}
              min="0"
              required
              className="
                w-full px-4 py-3 rounded-xl border border-neutral-300
                focus:ring-2 focus:ring-red-500 focus:border-red-500
                transition bg-neutral-50 hover:bg-neutral-100
              "
              placeholder="Ej: 24900"
            />
          </div>

          {/* IMAGEN */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              URL de Imagen
            </label>
            <input
              type="text"
              name="imagen"
              value={producto.imagen || ""}
              onChange={manejarChange}
              className="
                w-full px-4 py-3 rounded-xl border border-neutral-300
                focus:ring-2 focus:ring-red-500 focus:border-red-500
                transition bg-neutral-50 hover:bg-neutral-100
              "
              placeholder="https://..."
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              rows="4"
              value={producto.descripcion || ""}
              onChange={manejarChange}
              required
              className="
                w-full px-4 py-3 rounded-xl border border-neutral-300
                focus:ring-2 focus:ring-red-500 focus:border-red-500
                transition bg-neutral-50 hover:bg-neutral-100
              "
              placeholder="Descripción breve y clara del producto..."
            ></textarea>
          </div>

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Tipo de Producto
            </label>
            <select
              name="tipo"
              value={producto.tipo || ""}
              onChange={manejarChange}
              required
              className="
                w-full px-4 py-3 rounded-xl border border-neutral-300
                focus:ring-2 focus:ring-red-500 focus:border-red-500
                bg-neutral-50 hover:bg-neutral-100 transition
              "
            >
              <option value="">Seleccionar tipo...</option>
              <option value="remeras">Remeras</option>
              <option value="zapatillas">Zapatillas</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onCerrar}
              className="
                px-5 py-2.5 text-sm rounded-xl
                bg-neutral-200 hover:bg-neutral-300 transition
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                px-6 py-2.5 text-sm rounded-xl font-semibold
                bg-red-500 hover:bg-red-600
                text-white transition shadow-md
              "
            >
              {modo === "agregar" ? "Agregar" : "Actualizar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormProducto;
