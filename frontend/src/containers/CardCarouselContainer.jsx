import React, { useState, useRef } from 'react';
import DeleteFromContainer from '../containers/DeleteFormContainer';
import NoteCard from '../components/NoteCard';
import styles from '../styles/CardCarouselContainer.module.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import NoteFormContainer from '../containers/NoteFormContainer'

function CardCarouselContainer({ notas, categorias, eliminarNotaDelEstado, handleEditarNota }) {
    const [notaParaBorrar, setNotaParaBorrar] = useState(null);

    /* Referencia para controlar el scroll del contenedor */
    const scrollRef = useRef(null);

    /* Función para mover el scroll */
    const moverScroll = (desplazamiento) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += desplazamiento;
        }
    };

    return (
        <div className={styles.carouselWrapperRelative}>

            {/* Botón de flecha izquierda */}
            <button
                className={`${styles.flechaFlotante} ${styles.flechaIzquierda}`}
                onClick={() => moverScroll(-340)}
            >
                <FiChevronLeft size={24} />
            </button>

            {/* Carrusel */}
            <div className={styles.carouselScroll} ref={scrollRef}>
                {notas.map((nota) => {
                    /* Buscamos la categoría que coincida con el id de la nota */
                    const categoriaEncontrada = categorias.find(c => c.id === nota.categoria_id);

                    return (
                        <div key={nota.id} className={styles.carouselItem}>
                            <NoteCard
                                nota={nota}
                                /* Pasamos el nombre de la categoría encontrada o null si no existe */
                                nombreCategoria={categoriaEncontrada ? categoriaEncontrada.nombre : null}
                                handleOnClickEliminar={() => setNotaParaBorrar(nota)}
                                onClick={() => handleEditarNota(nota)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Botón de flecha derecha */}
            <button
                className={`${styles.flechaFlotante} ${styles.flechaDerecha}`}
                onClick={() => moverScroll(340)}
            >
                <FiChevronRight size={24} />
            </button>

            {/* Modal de eliminación */}
            {notaParaBorrar && (
                <DeleteFromContainer
                    isNota={true}
                    nota={notaParaBorrar}
                    categoria={null}
                    handleOnClose={() => setNotaParaBorrar(null)}
                    eliminarNotaDelEstado={eliminarNotaDelEstado}
                />
            )}

        </div>
    );
}

export default CardCarouselContainer;