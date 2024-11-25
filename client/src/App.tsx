import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Employees from './pages/Employees'
import Enterprises from './pages/Enterprises'
import Roles from './pages/Roles'
import Works from './pages/Works'
import Presence from './pages/Attendances'
import Layout from './pages/Layout'

function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Employees />} path="/funcionarios" />
            <Route element={<Enterprises />} path="/empresas" />
            <Route element={<Roles />} path="/funcoes" />
            <Route element={<Works />} path="/obras" />
            <Route element={<Presence />} path="/lista-de-presenca" />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
