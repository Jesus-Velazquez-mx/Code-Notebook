import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/HomeContainer.module.css';

function Layout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    /* Cerrar sesión */
    const handleCerrarSesion = () => {
        logout();
        navigate('/ingresar');
    }

    return (
        <div className={styles.contenedorMenu}>
            <div>
                <MenuBar handleCerrarSesion={handleCerrarSesion} />
            </div>

            {/* Un Outlet contiene vistas dentro */}
            <div className={styles.contenidoPrincipal}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;