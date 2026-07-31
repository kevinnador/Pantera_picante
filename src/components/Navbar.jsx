import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { rol } = useAuthContext();
  const esAdmin = rol === "admin";

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#111] text-white border-b border-white/10 shadow-md">

      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:justify-center">

        {/* --- MOBILE: BOTÓN HAMBURGUESA --- */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* --- DESKTOP MENU CENTRADO --- */}
        <div className="hidden md:flex items-center justify-center gap-14 text-base font-semibold tracking-wider">
          <Link to="/inicio" className="hover:text-red-500 transition tracking-widest">
            INICIO
          </Link>

          <Link to="/productos/remeras" className="hover:text-red-500 transition tracking-widest">
            REMERAS
          </Link>

          <Link to="/productos/zapatillas" className="hover:text-red-500 transition tracking-widest">
            ZAPATILLAS
          </Link>

          <Link to="/productos/accesorios" className="hover:text-red-500 transition tracking-widest">
            ACCESORIOS
          </Link>

          {esAdmin && (
            <Link to="/admin" className="hover:text-red-500 transition tracking-widest">
              ADMIN
            </Link>
          )}
        </div>

        {/* --- RESERVA ESPACIO EN MOBILE PARA CENTRAR MENÚ --- */}
        <span className="text-transparent md:hidden">☰</span>
      </div>

      {/* --- MENU MOBILE --- */}
      {open && (
        <div className="md:hidden flex flex-col bg-[#111] px-6 pb-4 gap-4 text-lg font-medium tracking-wide border-t border-white/10">

          <Link to="/inicio" className="hover:text-red-500" onClick={() => setOpen(false)}>
            INICIO
          </Link>

          <Link to="/productos/remeras" className="hover:text-red-500" onClick={() => setOpen(false)}>
            REMERAS
          </Link>

          <Link to="/productos/zapatillas" className="hover:text-red-500" onClick={() => setOpen(false)}>
            ZAPATILLAS
          </Link>

          <Link to="/productos/accesorios" className="hover:text-red-500" onClick={() => setOpen(false)}>
            ACCESORIOS
          </Link>

          {esAdmin && (
            <Link to="/admin" className="hover:text-red-500" onClick={() => setOpen(false)}>
              ADMIN
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
