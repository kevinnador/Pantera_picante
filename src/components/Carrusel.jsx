import { useState } from "react";
import { Link } from "react-router-dom";

export default function SliderPanteraPicante() {
  const slides = [
    {
      imagen: "https://picsum.photos/seed/remeras-pantera/1600/900",
      titulo: "Remeras con Actitud",
      descripcion: "Diseños urbanos, calces cómodos y estampas que no pasan desapercibidas.",
      link: "/productos/remeras",
      boton: "Ver remeras"
    },
    {
      imagen: "https://picsum.photos/seed/zapatillas-pantera/1600/900",
      titulo: "Zapatillas Urbanas",
      descripcion: "Comodidad y estilo para moverte por la ciudad sin bajar el ritmo.",
      link: "/productos/zapatillas",
      boton: "Ver zapatillas"
    },
    {
      imagen: "https://picsum.photos/seed/accesorios-pantera/1600/900",
      titulo: "Accesorios Picantes",
      descripcion: "Gorras, mochilas y detalles que completan tu look.",
      link: "/productos/accesorios",
      boton: "Ver accesorios"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="w-full max-w-full overflow-hidden">

      <div className="relative w-full max-w-full h-[28rem] md:h-[calc(100vh-120px)] bg-[#151313] shadow-xl overflow-hidden">

        {/* Slides wrapper */}
        <div
          className="flex transition-transform duration-700 max-w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-full max-w-full h-[28rem] md:h-[calc(100vh-120px)] bg-center bg-cover overflow-hidden"
              style={{ backgroundImage: `url(${slide.imagen})` }}
            >
              {/* Overlay */}
              <div className="flex flex-col justify-center items-center h-full bg-black/50 backdrop-blur-sm px-6 text-center">

                <h2 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-xl">
                  {slide.titulo}
                </h2>

                <p className="mt-3 text-[#e8ddd0] text-base md:text-2xl max-w-xl leading-relaxed">
                  {slide.descripcion}
                </p>

                <Link
                  to={slide.link}
                  className="mt-6 py-3 px-7 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-lg shadow-lg transition"
                >
                  {slide.boton}
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 rounded-full
                      flex items-center justify-center text-white text-3xl
                      bg-black/40 hover:bg-black/60 backdrop-blur-md transition"
        >
          ‹
        </button>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-full
                      flex items-center justify-center text-white text-3xl
                      bg-black/40 hover:bg-black/60 backdrop-blur-md transition"
        >
          ›
        </button>

      </div>
    </div>
  );
}
