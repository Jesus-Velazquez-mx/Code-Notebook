import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar'
import styles from '../styles/HomeContainer.module.css'
import { AuthContext } from '../context/AuthContext'


function HomeContainer() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        logout();
        navigate('/ingresar')
    }

    return (
        <div className={styles.contenedorMenu}>
            <div>
                <MenuBar handleCerrarSesion={handleCerrarSesion} />
            </div>
            <h1>Test home</h1>
        </div>
    )
}

export default HomeContainer;