import React from 'react';
import styles from '../styles/NoteCard.module.css';
import { FiX } from 'react-icons/fi';

function NoteCard({ nota, nombreCategoria, handleOnClickEliminar, onClick }) {
    /* Función para formatear la fecha a DD/MM/AAAA HH:MM */
    const formatearFecha = (fecha) => {
        if (!fecha) return "";
        let fechaLimpia = fecha.replace('T', ' ').replace('Z', '').split('.')[0];
        const partes = fechaLimpia.split(' ');

        if (partes.length === 2) {
            const [year, month, day] = partes[0].split('-');
            const [hour, minute] = partes[1].split(':');
            return `${day}/${month}/${year} ${hour}:${minute}`;
        }

        return fecha; // Por si llega en un formato inesperado
    };

    return (
        <div
            className={styles.contenedorCartaNota}
            role="button"
            tabIndex={0}
            onClick={onClick}
        >
            {/* Contenedor para el texto para que se agrupe arriba */}
            <div className={styles.contenidoPrincipal}>
                <span className={styles.etiquetaCategoria}>
                    {nombreCategoria ? nombreCategoria : 'Sin categoría'}
                </span>
                <h1 className={styles.h1CartaNota}>{nota.titulo}</h1>
                {nota.subtitulo && <h2 className={styles.h2CartaNota}>{nota.subtitulo}</h2>}
                <p className={styles.pCartaNota}>{nota.contenido}</p>
            </div>

            {/* Contenedor para la fecha y el botón para que se vayan hasta abajo */}
            <div className={styles.pieDeCarta}>
                <p className={styles.fechaCartaNota}>{formatearFecha(nota.fecha_creacion)}</p>
                <button
                    className={styles.botonEliminar}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOnClickEliminar();
                    }}
                >
                    <FiX size={18} /> Eliminar
                </button>
            </div>
        </div>
    );
}

export default NoteCard;