import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductosProvider } from "./context/ProductoContext.jsx";
import { BusquedaProvider } from "./context/BusquedaContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductosProvider>
          <BusquedaProvider>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </BusquedaProvider>
        </ProductosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
