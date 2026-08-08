import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NoteForm from '../components/NoteForm';
import { toast } from 'react-toastify';
import styles from '../styles/NoteFormContainer.module.css'



function NoteFormContainer({ isEditar, cerrarModal, agregarNotaAlEstado, notaData, actualizarNotaEnElEstado, categorias }) {
    /* Para la navegación */
    const navigate = useNavigate();

    const [nota, setNota] = useState({
        titulo: '',
        subtitulo: '',
        contenido: '',
        categoria_id: ''
    });

    /* Llenar el estado local si estamos en modo edición */
    useEffect(() => {
        if (isEditar && notaData) {
            setNota({
                id: notaData.id,
                titulo: notaData.titulo || '',
                subtitulo: notaData.subtitulo || '',
                contenido: notaData.contenido || '',
                categoria_id: notaData.categoria_id || ''
            });
        }
    }, [isEditar, notaData]);

    /* Crear una nota */
    const handleOnCrearNota = async (e) => {
        e.preventDefault();
        /* Sacamos el token del navegador */
        const token = localStorage.getItem('token_codeNotebook');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.post('/api/crearNota', nota, config)
            const notaCreadaConId = response.data.nota;
            toast.success('Se ha agregado la nota correctamente');
            handleOnClose();
            agregarNotaAlEstado(notaCreadaConId);
        } catch (err) {
            console.log('No se pudo crear la nota', err)
            toast.error('No se pudo crear la nota')
        }
    }

    /* Editar una nota */
    const handleOnEditarNota = async (e) => {
        e.preventDefault();
        /* Sacamos el token del navegador */
        const token = localStorage.getItem('token_codeNotebook');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            await axios.put('/api/editarNota', nota, config)
            toast.success('Se ha editado la nota correctamente')
            handleOnClose();
            actualizarNotaEnElEstado(nota)
        } catch (err) {
            console.log('No se pudo editar la nota', err)
            toast.error('No se pudo editar la nota')
        }

    }

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
                nota: nota
            }
        }
        try {
            await axios.delete('/api/borrarNota', nota, config)
            toast.success('Se ha borrado la nota correctamente')
            handleOnClose();
        } catch (err) {
            console.log('No se pudo borrar la nota', err)
            toast.error('No se pudo borrar la nota')
        }
    }

    /* Manejar los inputs del formulario y convertir el id de la categoría a número */
    const handleInputChange = ({ target }) => {
        setNota({
            ...nota,
            [target.name]: target.name === 'categoria_id' ? Number(target.value) : target.value
        });
    };

    /* Para cerrar el modal */
    const handleOnClose = () => {
        setNota({
            titulo: '',
            subtitulo: '',
            contenido: '',
            categoria_id: ''
        })
        if (cerrarModal) {
            cerrarModal();
        }
    };

    return (
        <div className={styles.contenedorFormularioNota}>
            <NoteForm
                nota={nota}
                categorias={categorias}
                handleOnCrearNota={handleOnCrearNota}
                handleOnEditarNota={handleOnEditarNota}
                isEditar={isEditar}
                handleInputChange={handleInputChange}
                handleOnClose={handleOnClose}
            />
        </div>
    )
}

export default NoteFormContainer;