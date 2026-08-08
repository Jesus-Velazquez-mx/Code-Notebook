import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/CategoryContainer.module.css';
import NoteFormContainer from './NoteFormContainer';
import CategoryFormContainer from './CategoryFormContainer';
import DeleteFormContainer from './DeleteFormContainer';
import CategoryCard from '../components/CategoryCard';


function CategoryContainer() {
    const [categorias, setCategorias] = useState([]);
    const [notas, setNotas] = useState([]);

    /* Estados para Notas */
    const [notaParaEditar, setNotaParaEditar] = useState(null);
    const [abrirModalNota, setAbrirModalNota] = useState(false);
    const [notaParaBorrar, setNotaParaBorrar] = useState(null); /* NUEVO */

    /* Estados para Categorías */
    const [categoriaParaEditar, setCategoriaParaEditar] = useState(null);
    const [abrirModalCategoria, setAbrirModalCategoria] = useState(false);
    const [categoriaParaBorrar, setCategoriaParaBorrar] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            const token = localStorage.getItem('token_codeNotebook');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            try {
                const [notasRes, categoriasRes] = await Promise.all([
                    axios.get('/api/listarTodasLasNotas', config),
                    axios.get('/api/listarCategorias', config)
                ]);

                setNotas(notasRes.data);
                setCategorias(categoriasRes.data);
            } catch (error) {
                console.log('Error al cargar la libreta:', error);
            }
        };

        fetchDatos();
    }, []);

    /* Para borrar nota del arreglo local y que se actualice el estado */
    const eliminarNotaDelEstado = (idBorrado) => {
        const notasActualizadas = notas.filter(n => n.id !== idBorrado);
        setNotas(notasActualizadas);
    };

    /* Para agregar nota al arreglo local y que se actualice el estado */
    const agregarNotaAlEstado = (nuevaNota) => {
        const notasActualizadas = [...notas, nuevaNota];
        setNotas(notasActualizadas)
    }
    /* Para actualizar una nota en el arreglo local (necesario tras editar) */
    const actualizarNotaEnElEstado = (notaEditada) => {
        const notasActualizadas = notas.map(n =>
            n.id === notaEditada.id ? notaEditada : n
        );
        setNotas(notasActualizadas);
    };

    /* Para borrar categoría del arreglo local y que se actualice el estado */
    const eliminarCategoriaDelEstado = (idBorrado) => {
        const categoriasActualizadas = categorias.filter(c => c.id !== idBorrado);
        setCategorias(categoriasActualizadas);
        const notasRestantes = notas.filter(n => n.categoria_id !== idBorrado);
        setNotas(notasRestantes);
    };

    /* Para agregar categoría al arreglo local y que se actualice el estado */
    const agregarCategoriaAlEstado = (nuevaCategoria) => {
        const categoriasActualizadas = [...categorias, nuevaCategoria];
        setCategorias(categoriasActualizadas);
    };

    /* Para actualizar una categoría en el arreglo local (necesario tras editar) */
    const actualizarCategoriaEnElEstado = (categoriaEditada) => {
        const categoriasActualizadas = categorias.map(c =>
            c.id === categoriaEditada.id ? categoriaEditada : c
        );
        setCategorias(categoriasActualizadas);
    };


    return (
        <div className={styles.libretaContenedor}>
            {/* NUEVO: Contenedor flex para el título y los botones principales */}
            <div className={styles.cabeceraPagina}>
                <h1 className={styles.tituloPagina}>Mi Libreta</h1>
                <div className={styles.botonesAccion}>
                    <button onClick={() => setAbrirModalCategoria(true)} className={styles.botonPrimario}>
                        + Categoría
                    </button>
                    <button onClick={() => setAbrirModalNota(true)} className={styles.botonPrimario}>
                        + Nota
                    </button>
                </div>
            </div>

            {/* Modal de Notas */}
            {abrirModalNota && (
                <NoteFormContainer
                    isEditar={notaParaEditar !== null}
                    categorias={categorias}
                    notaData={notaParaEditar}
                    agregarNotaAlEstado={agregarNotaAlEstado} /* Añadido */
                    actualizarNotaEnElEstado={actualizarNotaEnElEstado}
                    cerrarModal={() => {
                        setAbrirModalNota(false);
                        setNotaParaEditar(null);
                    }}
                />
            )}

            {/* Modal de Categorías */}
            {abrirModalCategoria && (
                <CategoryFormContainer
                    isEditar={categoriaParaEditar !== null}
                    agregarCategoriaAlEstado={agregarCategoriaAlEstado}
                    categoriaData={categoriaParaEditar}
                    actualizarCategoriaEnElEstado={actualizarCategoriaEnElEstado}
                    cerrarModal={() => {
                        setAbrirModalCategoria(false);
                        setCategoriaParaEditar(null);
                    }}
                />
            )}

            {/* Modales de Borrado */}
            {notaParaBorrar && (
                <DeleteFormContainer
                    isNota={true}
                    nota={notaParaBorrar}
                    categoria={null}
                    handleOnClose={() => setNotaParaBorrar(null)}
                    eliminarNotaDelEstado={eliminarNotaDelEstado}
                />
            )}

            {categoriaParaBorrar && (
                <DeleteFormContainer
                    isNota={false}
                    categoria={categoriaParaBorrar}
                    nota={null}
                    handleOnClose={() => setCategoriaParaBorrar(null)}
                    eliminarCategoriaDelEstado={eliminarCategoriaDelEstado}
                />
            )}

            {/* Libreta */}
            <div className={styles.gridCategorias}>
                {categorias.map(categoria => {
                    const notasDeEstaCategoria = notas.filter(nota => nota.categoria_id === categoria.id);
                    return (
                        <div key={categoria.id} className={styles.columnaCategoria}>

                            <div className={styles.cabeceraCategoriaFila}>
                                <CategoryCard
                                    categoria={categoria}
                                    onClick={() => {
                                        setCategoriaParaEditar(categoria);
                                        setAbrirModalCategoria(true);
                                    }}
                                    handleOnClickEliminar={() => setCategoriaParaBorrar(categoria)}
                                />

                                {/* Mantenemos el contador a un lado */}
                                <span className={styles.contador}>
                                    ({notasDeEstaCategoria.length} notas)
                                </span>
                            </div>

                            <ul className={styles.listaNotas}>
                                {notasDeEstaCategoria.length === 0 ? (
                                    <li className={styles.notaVacia}>Sin notas aún...</li>
                                ) : (
                                    notasDeEstaCategoria.map(nota => (
                                        <li
                                            key={nota.id}
                                            className={styles.itemNotaFila}
                                        >
                                            <span
                                                className={styles.tituloNotaListado}
                                                onClick={() => {
                                                    setNotaParaEditar(nota);
                                                    setAbrirModalNota(true);
                                                }}
                                            >
                                                {nota.titulo}
                                            </span>

                                            <button
                                                className={styles.botonEliminarNota}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Evita que se abra el modal de editar
                                                    setNotaParaBorrar(nota);
                                                }}
                                            >
                                                X
                                            </button>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CategoryContainer;