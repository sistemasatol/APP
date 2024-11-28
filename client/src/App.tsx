import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Funcionarios from './pages/Funcionarios'
import Empresas from './pages/Empresas'
import Cargos from './pages/Cargos'
import Obras from './pages/Obras'
import ListaDePresencaPage from './pages/ListaDePresencaPage'
import Layout from './pages/Layout'

function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Funcionarios />} path="/funcionarios" />
            <Route element={<Empresas />} path="/empresas" />
            <Route element={<Cargos />} path="/cargos" />
            <Route element={<Obras />} path="/obras" />
            <Route element={<ListaDePresencaPage />} path="/lista-de-presenca" />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
