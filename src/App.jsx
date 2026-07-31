import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './Paginas/Inicio'
import DetalleProducto from './Paginas/DetalleProducto'
import { Routes, Route } from 'react-router-dom'
import RutaProtegida from './components/Protected/RutaProtegida'
import Login from './components/Protected/Login'
import Carrito from './components/Carrito'
import Admin from './components/admin'
import BuscarPage from "./Paginas/BuscarPage";
import ProductosCategoria from './components/ProductosCategoria'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <div>
      <Header />
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Buscador */}
        <Route path="/buscar" element={<BuscarPage />} />
        {/* Inicio */}
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        {/* Admin protegido */}
        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />
        {/* Carrito protegido */}
        <Route
          path="/carrito"
          element={
            <RutaProtegida>
              <Carrito />
            </RutaProtegida>
          }
        />
        {/* Categorías */}
        <Route
          path="/productos/remeras"
          element={
            <ProductosCategoria categoria="remeras" titulo="Remeras" />
          }
        />
        <Route
          path="/productos/zapatillas"
          element={
            <ProductosCategoria categoria="zapatillas" titulo="Zapatillas" />
          }
        />
        <Route
          path="/productos/accesorios"
          element={
            <ProductosCategoria categoria="accesorios" titulo="Accesorios" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
