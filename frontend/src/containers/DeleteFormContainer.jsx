import React from 'react';
import DeleteForm from '../components/DeleteForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import styles from '../styles/DeleteFormContainer.module.css'

function DeleteFormContainer({ isNota, nota, categoria, handleOnClose, eliminarNotaDelEstado, eliminarCategoriaDelEstado }) {
    const navigate = useNavigate();

    /* Borrar una nota */
    const handleOnBorrarNota = async (e) => {
        e.preventDefault();
        /* Sacamos el token del navegador */
        const token = localStorage.getItem('token_codeNotebook');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: nota.id
            }
        }
        try {
            await axios.delete('/api/borrarNota', config)
            toast.success('Se ha borrado la nota correctamente')
            handleOnClose();
            eliminarNotaDelEstado(nota.id)
            navigate('/inicio')

        } catch (err) {
            console.log('No se pudo borrar la nota', err)
            toast.error('No se pudo borrar la nota')
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
                id: categoria.id
            }
        }
        try {
            await axios.delete('/api/borrarCategoria', config)
            toast.success('Se ha borrado la categoria correctamente')
            handleOnClose();
            eliminarCategoriaDelEstado(categoria.id)
            navigate('/inicio')
        } catch (err) {
            console.log('No se pudo borrar la cateogira', err)
            toast.error('No se pudo borrar la categoria')
        }
    }

    return (
        <div className={styles.contenedorFormularioEliminar}>
            <DeleteForm
                isNota={isNota}
                handleOnBorrarNota={handleOnBorrarNota}
                handleOnBorrarCategoria={handleOnBorrarCategoria}
                handleOnClose={handleOnClose}
            />
        </div>
    )
}


export default DeleteFormContainer;