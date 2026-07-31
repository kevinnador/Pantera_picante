import { Link } from "react-router-dom";
import BarraBusqueda from "./BarraBusqueda";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, rol, logout } = useAuthContext();
  const estaLogueado = !!usuario;

  return (
    <header className="bg-[#151313] text-white border-b border-white/10 sticky top-0 z-50">
      {/* FILA PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 md:gap-6">
        {/* LOGO */}
        <Link
          to="/inicio"
          className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#f5efe8] hover:text-red-500 transition"
        >
          PANTERA <span className="text-red-500">PICANTE</span>
        </Link>

        {/* DERECHA EN MOBILE: usuario + carrito + login/logout (compacto) */}
        <div className="flex items-center gap-3 md:hidden">
          {estaLogueado && (
            <span className="max-w-[90px] truncate text-xs px-2 py-1 rounded-md bg-[#221d1a] border border-[#3b3733]">
              {rol === "admin" ? `Admin: ${usuario}` : usuario}
            </span>
          )}

          {/* CARRITO */}
          <Link
            to="/carrito"
            className="relative p-2 rounded-lg hover:bg-white/10 transition"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 2h2l3 12a2 2 0 0 0 2 1h10a2 2 0 0 0 2-1l2-8H5" />
            </svg>

            {carrito.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                {carrito.length}
              </span>
            )}
          </Link>

          {/* LOGIN / LOGOUT */}
          {estaLogueado ? (
            <button
              onClick={logout}
              className="px-3 py-1 text-xs bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 text-xs bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* CENTRO + DERECHA EN DESKTOP */}
        <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
          {/* BUSCADOR CENTRADO (desktop) */}
          <div className="flex-1 max-w-xl mx-auto">
            <BarraBusqueda />
          </div>

          {/* USUARIO */}
          {estaLogueado && (
            <span className="
              max-w-[110px]
              px-3 py-1
              rounded-lg
              bg-[#221d1a]
              text-xs
              text-gray-300
              border border-[#3b3733]
              truncate
            ">
              {rol === "admin" ? (
                <span className="text-red-500 font-bold">Admin</span>
              ) : (
                <span className="text-gray-200">{usuario}</span>
              )}
            </span>
          )}

          {/* CARRITO */}
          <Link
            to="/carrito"
            className="relative p-2 rounded-lg hover:bg-white/10 transition"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 2h2l3 12a2 2 0 0 0 2 1h10a2 2 0 0 0 2-1l2-8H5" />
            </svg>

            {carrito.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                {carrito.length}
              </span>
            )}
          </Link>

          {/* LOGIN / LOGOUT */}
          {estaLogueado ? (
            <button
              onClick={logout}
              className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* BUSCADOR EN MOBILE (ABAJO, FULL WIDTH) */}
      <div className="md:hidden border-t border-white/10 pb-3">
        <div className="max-w-7xl mx-auto px-4 pt-2">
          <BarraBusqueda />
        </div>
      </div>
    </header>
  );
};

export default Header;
