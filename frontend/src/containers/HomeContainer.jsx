import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import MenuBar from '../components/MenuBar'
import styles from '../styles/HomeContainer.module.css'
import { AuthContext } from '../context/AuthContext'
import CategoryFormContainer from '../containers/CategoryFormContainer'
import NoteFormContainer from '../containers/NoteFormContainer'
import CardCarouselContainer from '../containers/CardCarouselContainer'
import CategoryCardContainer from '../containers/CategoryCardContainer'


function HomeContainer() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [abrirModalCategoria, setAbrirModalCategoria] = useState(false)
    const [abrirModalNota, setAbrirModalNota] = useState(false)
    const [notas, setNotas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [notaParaEditar, setNotaParaEditar] = useState(null);
    const [categoriaParaEditar, setCategoriaParaEditar] = useState(null);


    /* Para obtener las notas y categorias cuando se renderiza */
    useEffect(() => {
        const fetchDatosIniciales = async () => {
            const token = localStorage.getItem('token_codeNotebook');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            try {
                // Promise.all ejecuta ambas peticiones en paralelo
                const [notasRes, categoriasRes] = await Promise.all([
                    axios.get('/api/listarUltimasNotas', config),
                    axios.get('/api/listarCategorias', config)
                ]);

                setNotas(notasRes.data);
                setCategorias(categoriasRes.data);
                console.log('Notas y categorías cargadas correctamente');
            } catch (error) {
                console.log('Error al cargar los datos iniciales:', error);
            }
        };

        fetchDatosIniciales();
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

    /* Cerrar sesión */
    const handleCerrarSesion = () => {
        logout();
        navigate('/ingresar')
    }

    /* Abrir el modal de la categoría */
    const handleOnClickCategoria = () => {
        setAbrirModalCategoria(true)
        setCategoriaParaEditar(null)
    }

    /* Abrir el modal para una nueva nota */
    const handleOnClickNota = () => {
        setNotaParaEditar(null);
        setAbrirModalNota(true);
    }

    /* Abrir el modal para editar una nota existente */
    const handleEditarNota = (nota) => {
        setNotaParaEditar(nota);
        setAbrirModalNota(true);
    }

    /* Abrir el modal para editar una categoría existente */
    const handleEditarCategoria = (categoria) => {
        setCategoriaParaEditar(categoria);
        setAbrirModalCategoria(true)
    }

    return (
        <div className={styles.contenedorMenu}>
            <div className={styles.contenidoPrincipal}>
                <section className={styles.seccionContenedor}>
                    <div className={styles.cabeceraSeccion}>
                        <h2 className={styles.tituloSeccion}>Tus notas recientes</h2>
                        <button className={styles.botonPrincipal} onClick={handleOnClickNota}>
                            + Agregar nota
                        </button>
                    </div>

                    {/* Modal de Nota */}
                    <div>
                        {abrirModalNota && (
                            <NoteFormContainer
                                isEditar={notaParaEditar !== null}
                                categorias={categorias}
                                notaData={notaParaEditar}
                                agregarNotaAlEstado={agregarNotaAlEstado}
                                actualizarNotaEnElEstado={actualizarNotaEnElEstado}
                                cerrarModal={() => {
                                    setAbrirModalNota(false);
                                    setNotaParaEditar(null);
                                }}
                            />
                        )}
                    </div>

                    <CardCarouselContainer
                        notas={notas}
                        categorias={categorias}
                        eliminarNotaDelEstado={eliminarNotaDelEstado}
                        handleEditarNota={handleEditarNota}
                    />
                </section>

                <section className={styles.seccionContenedor}>
                    <div className={styles.cabeceraSeccion}>
                        <h2 className={styles.tituloSeccion}>Tus categorías</h2>
                        <button className={styles.botonPrincipal} onClick={handleOnClickCategoria}>
                            + Agregar categoría
                        </button>
                    </div>

                    {/* Modal de Categoría */}
                    <div>
                        {abrirModalCategoria && (
                            <CategoryFormContainer
                                isEditar={categoriaParaEditar !== null}
                                agregarCategoriaAlEstado={agregarCategoriaAlEstado}
                                categoriaData={categoriaParaEditar}
                                actualizarCategoriaEnElEstado={actualizarCategoriaEnElEstado}
                                cerrarModal={() => {
                                    setAbrirModalCategoria(false)
                                    setCategoriaParaEditar(null)
                                }}
                            />
                        )}
                    </div>

                    <CategoryCardContainer
                        categorias={categorias}
                        eliminarCategoriaDelEstado={eliminarCategoriaDelEstado}
                        handleEditarCategoria={handleEditarCategoria}
                    />
                </section>

            </div>
        </div>
    )
}

export default HomeContainer;