import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/sitio/Home';
import Contacto from './pages/sitio/Contacto';
import QuienesSomos from './pages/sitio/QuienesSomos';
import Terminos from './pages/sitio/Terminos';
import Alcance from './pages/documentacion/Alcance';
import ManualUsuario from './pages/documentacion/ManualUsuario';
import CrudClientes from './pages/actividades/CrudClientes';
import CrudProductos from './pages/actividades/CrudProductos';
import HistorialPedidos from './pages/actividades/HistorialPedidos';
import Indicadores from './pages/actividades/Indicadores';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/alcance" element={<Alcance />} />
          <Route path="/manual" element={<ManualUsuario />} />
          <Route path="/clientes" element={<CrudClientes />} />
          <Route path="/productos" element={<CrudProductos />} />
          <Route path="/pedidos" element={<HistorialPedidos />} />
          <Route path="/indicadores" element={<Indicadores />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
