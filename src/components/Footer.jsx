const Footer = () => {
  return (
    <footer className="w-full bg-[#121010] pt-16 pb-10 px-6 border-t border-[#2a2724]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center sm:text-left">

        {/* Marca */}
        <div>
          <h2 className="text-3xl font-extrabold tracking-wide text-white">
            PANTERA <span className="text-red-500">PICANTE</span>
          </h2>

          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Ropa y calzado urbano con actitud. Diseño con carácter para
            quienes no pasan desapercibidos.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Navegación
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li><a href="/inicio" className="hover:text-red-500 transition">Inicio</a></li>
            <li><a href="/productos/remeras" className="hover:text-red-500 transition">Remeras</a></li>
            <li><a href="/productos/zapatillas" className="hover:text-red-500 transition">Zapatillas</a></li>
            <li><a href="/productos/accesorios" className="hover:text-red-500 transition">Accesorios</a></li>
            <li><a href="/carrito" className="hover:text-red-500 transition">Carrito</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold text-white mb-4">
            Seguinos
          </h3>

          <div className="flex justify-center sm:justify-start w-full gap-4">

            {/* Instagram */}
            <a
              href="#"
              className="
                w-10 h-10 rounded-full bg-[#24211f] flex items-center justify-center
                text-white hover:bg-red-500 hover:text-white transition shadow-lg
              "
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm10 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="
                w-10 h-10 rounded-full bg-[#24211f] flex items-center justify-center
                text-white hover:bg-red-500 hover:text-white transition shadow-lg
              "
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h2v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="#"
              className="
                w-10 h-10 rounded-full bg-[#24211f] flex items-center justify-center
                text-white hover:bg-red-500 hover:text-white transition shadow-lg
              "
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.9a7.2 7.2 0 0 0 4 1.2V7.1a4.2 4.2 0 0 1-4-3.1z"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center border-t border-[#2a2724] pt-6">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="text-[#f5efe8]">Pantera Picante</span>.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
