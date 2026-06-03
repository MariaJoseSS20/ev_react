import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import Terminos from './pages/Terminos';
import Alcance from './pages/Alcance';
import DiagramaClases from './pages/DiagramaClases';
import DiagramaCasosUso from './pages/DiagramaCasosUso';
import CrudClientes from './pages/CrudClientes';
import Indicadores from './pages/Indicadores';
import Laboratorio from './pages/Laboratorio';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/alcance" element={<Alcance />} />
          <Route path="/diagrama-clases" element={<DiagramaClases />} />
          <Route path="/diagrama-casos-uso" element={<DiagramaCasosUso />} />
          <Route path="/clientes" element={<CrudClientes />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/laboratorio" element={<Laboratorio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
