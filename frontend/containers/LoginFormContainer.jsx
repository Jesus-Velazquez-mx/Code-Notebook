import React, { useState, useContext } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginFormContainer.module.css'


function LoginFormContainer({ isInicioSesion }) {
    /* Para la navegación */
    const navigate = useNavigate();
    /* Sacamos la función login de AuthContext */
    const { login, isAuth } = useContext(AuthContext);

    const [usuario, setUsuario] = useState({
        nombre: '',
        contrasena: ''
    })

    const handleOnIniciarSesion = async (e) => {
        /* Evitar que se recargue la página */
        e.preventDefault();
        try {
            /* Esto nos da un objeto de respuesta, donde las propiedades que definimos están el .data*/
            const usuarioLogueado = await axios.post('/api/iniciarSesion', usuario)
            /* Hay que recordar que el backend pone el token en la propiedad 
                data.token /*
            /* res.status(200).json(token: token)*/
            console.log('Inicio de sesión exitoso');
            toast.success('Inicio de sesión exitoso');
            /* localStorage.setItem('token_codeNotebook', nuevoToken); */
            login(usuarioLogueado.data.token);
            navigate('/inicio')

        } catch (error) {
            console.log('No se ha podido iniciar sesión', error);
            toast.error('Hubo un error al iniciar sesión');
        }
    }

    const handleOnRegistrar = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/registrar', usuario);
            console.log('Registro exitoso')
            toast.success('Te has registrado correctamente')
            navigate('/ingresar')
        } catch (error) {
            console.log('No se puedo registar al usuario', error);
            toast.error('Hubo un error al registrar al usuario');

        }
    }

    const handleInputChange = ({ target }) => {
        setUsuario({
            ...usuario,
            [target.name]: target.value
        })
    }

    const irIniciarSesion = () => {
        navigate('/ingresar');
        setUsuario({
            nombre: '',
            constrasena: ''
        });
    }

    const irRegistrar = () => {
        navigate('/registrar');
        setUsuario({
            nombre: '',
            constrasena: ''
        });
    }

    return (
        <div className={styles.contenedorFormulario}>
            <h1 className={styles.h1ContenedorFormulario}>Bienvenido a CodeNotebook</h1>
            <h2 className={styles.h2ContenedorFormulario}>Inicia sesión o crea una cuenta</h2>

            <LoginForm
                usuario={usuario}
                handleInputChange={handleInputChange}
                handleOnIniciarSesion={handleOnIniciarSesion}
                handleOnRegistrar={handleOnRegistrar}
                irIniciarSesion={irIniciarSesion}
                irRegistrar={irRegistrar}
                isInicioSesion={isInicioSesion}
            />
        </div>
    );
}

export default LoginFormContainer; 