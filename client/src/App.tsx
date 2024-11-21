import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Employees from './pages/Employees'
import Enterprises from './pages/Enterprises'
function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route element={<Employees />} path="/funcionarios" />
          <Route element={<Enterprises />} path="/empresas" />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
