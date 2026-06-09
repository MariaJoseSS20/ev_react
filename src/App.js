import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/sitio/Home';
import Contacto from './pages/sitio/Contacto';
import QuienesSomos from './pages/sitio/QuienesSomos';
import Terminos from './pages/sitio/Terminos';
import Alcance from './pages/documentacion/Alcance';
import DiagramaClases from './pages/documentacion/DiagramaClases';
import CrudClientes from './pages/actividades/CrudClientes';
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
          <Route path="/diagrama-clases" element={<DiagramaClases />} />
          <Route path="/clientes" element={<CrudClientes />} />
          <Route path="/indicadores" element={<Indicadores />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
