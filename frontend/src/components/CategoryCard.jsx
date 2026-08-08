import React from 'react';
import styles from '../styles/CategoryCard.module.css';
import { FiX } from 'react-icons/fi';

function CategoryCard({ categoria, handleOnClickEliminar, onClick }) {
    return (
        <div
            className={styles.contenedorCartaCategoria}
            role="button"
            tabIndex={0}
            onClick={onClick}
        >
            <span className={styles.tituloCategoria}>{categoria.nombre}</span>

            <button
                className={styles.botonEliminar}
                onClick={(e) => {
                    e.stopPropagation();
                    handleOnClickEliminar();
                }}
                title="Eliminar categoría"
            >
                <FiX size={18} />
            </button>
        </div>
    );
}

export default CategoryCard;