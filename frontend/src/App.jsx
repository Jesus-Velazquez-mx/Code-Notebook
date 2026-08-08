import React from 'react';
import LoginForm from './components/LoginForm';
/* Para las notificaciones */
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
/* Para manejar el router */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginFormContainer from './containers/LoginFormContainer';
import HomeContainer from './containers/HomeContainer';
import CategoryContainer from './containers/CategoryContainer'
import Layout from './components/Layout';
/* Para poder usar el contexto, este envuleve a toda la app*/
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Redirección inicial */}
            <Route path="/" element={<Navigate to="/ingresar" replace />} />

            {/* Rutas sin menú */}
            <Route path="/ingresar" element={<LoginFormContainer isInicioSesion />} />
            <Route path="/registrar" element={<LoginFormContainer isInicioSesion={false} />} />

            {/* Rutas con menú */}
            {/* Route element={<Outlet />}*/}
            <Route element={<Layout />}>
              <Route path="/inicio" element={<HomeContainer />} />
              <Route path="/categorias" element={<CategoryContainer />} />
            </Route>

            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/ingresar" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
