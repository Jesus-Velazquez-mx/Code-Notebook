import React from 'react';
import { Link } from 'react-router-dom'
import { FiHome, FiLogOut, FiFolder } from 'react-icons/fi'
import styles from '../styles/MenuBar.module.css'

function MenuBar({ handleCerrarSesion }) {
    return (
        <div className={styles.contenedorMenu}>
            {/* Parte de arriba */}
            <div className={styles.menuArriba}>
                <Link to="/inicio" className={styles.iconoMenu} title="Todas las notas">
                    <FiHome size={24} />
                </Link>
                <Link to="/categorias" className={styles.iconoMenu} title="Categorías">
                    <FiFolder size={24} />
                </Link>
            </div>

            {/* Parte de abajo */}
            <button className={styles.iconoMenu} title="Cerrar sesión" onClick={handleCerrarSesion}>
                <FiLogOut size={24} />
            </button>
        </div >
    )
}
export default MenuBar;