import React, { useState, useEffect } from 'react';
import CategoryForm from '../components/CategoryForm'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CategoryFormContainer.module.css'

function CategoryFormContainer({ isEditar, cerrarModal, agregarCategoriaAlEstado, actualizarCategoriaEnElEstado, categoriaData }) {
    /* Para la navegación */
    const navigate = useNavigate();

    const [categoria, setCategoria] = useState({
        nombre: ''
    });

    /* Llenar el estado local si estamos en modo edición */
    useEffect(() => {
        if (isEditar && categoriaData) {
            setCategoria({
                id: categoriaData.id,
                nombre: categoriaData.nombre || ''
            });
        }
    }, [isEditar, categoriaData]);

    /* Crear una categoría */
    const handleOnCrearCategoria = async (e) => {
        e.preventDefault();
        /* Sacamos el token del navegador */
        const token = localStorage.getItem('token_codeNotebook');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        /* Hacer la petición*/
        try {
            const respuesta = await axios.post('/api/crearCategoria', categoria, config); console.log('Se ha creado la categoría correctamente')
            toast.success('Se ha agregado la categoría correctamente')
            handleOnClose();
            agregarCategoriaAlEstado(respuesta.data.categoria);
        } catch (err) {
            console.log('No se pudo crear la categoria', err)
            toast.error('No se pudo crear la categoria')
        }
    }

    /* Editar una categoría */
    const handleOnEditarCategoria = async (e) => {
        e.preventDefault();
        /* Sacamos el token del navegador */
        const token = localStorage.getItem('token_codeNotebook');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        /* Hacer la petición*/
        try {
            await axios.put('/api/editarCategoria', categoria, config);
            console.log('Se ha editado la categoría correctamente')
            toast.success('Se ha editado la categoría correctamente')
            handleOnClose();
            actualizarCategoriaEnElEstado(categoria)
        } catch (err) {
            console.log('No se pudo editar la categoria', err)
            toast.error('No se pudo editar la categoria')
        }
    }

    /* Borrar una categoría */
    const handleOnBorrarCategoria = async (e) => {
        e.preventDefault();
        /* Sacamos el token del navegador */
        const token = localStorage.getItem('token_codeNotebook');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                categoria: categoria
            }
        }

        /* Hacer la petición*/
        try {
            await axios.delete('/api/borrarCategoria', categoria, config);
            console.log('Se ha borrado la categoría correctamente')
            toast.success('Se ha borrado la categoría correctamente')
        } catch (err) {
            console.log('No se pudo borrar la categoria', err)
            toast.error('No se pudo borrar la categoria')
        }
    }

    /* Manejar los inputs del formulario */
    const handleInputChange = ({ target }) => {
        setCategoria({
            ...categoria,
            [target.name]: target.value
        })
    }

    /* Para cerrar el modal */
    const handleOnClose = () => {
        setCategoria({ nombre: '' })
        if (cerrarModal) {
            cerrarModal();
        }
    }
    return (
        <div
            className={styles.contenedorFormularioCategoria}>
            <CategoryForm
                categoria={categoria}
                handleOnCrearCategoria={handleOnCrearCategoria}
                handleOnEditarCategoria={handleOnEditarCategoria}
                isEditar={isEditar}
                handleInputChange={handleInputChange}
                handleOnClose={handleOnClose} />
        </div>
    )
}

export default CategoryFormContainer;