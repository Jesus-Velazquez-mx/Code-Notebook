import React from 'react';
import LoginForm from '../components/LoginForm';
/* Para las notificaciones */
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
/* Para manejar el router */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginFormContainer from '../containers/LoginFormContainer';
import HomeContainer from '../containers/HomeContainer';
import CategoriaContainer from '../containers/CategoriaContainer'
/* Para poder usar el contexto, este envuleve a toda la app*/
import AuthProvider from '../context/AuthContext';


function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Si el usuario entra a la raíz ("/") lo mandamos automáticamente a "/login" */}
            <Route path="/" element={<Navigate to="/ingresar" replace />} />
            {/* Todas las rutas*/}
            <Route path="/ingresar" element={<LoginFormContainer isInicioSesion />} />
            <Route path="/registrar" element={<LoginFormContainer isInicioSesion={false} />} />
            <Route path="/inicio" element={<HomeContainer />} />
            <Route path="/categorias" element={<CategoriaContainer />} />

            {/* Buena práctica. Si alguien escribe lo que sea que no existe, lo mandamos a login */}
            <Route path="*" element={<Navigate to="/ingresar" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
