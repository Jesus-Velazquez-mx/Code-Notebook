import React from 'react';
import styles from '../styles/LoginForm.module.css'

function LoginForm({ usuario, isInicioSesion, handleOnIniciarSesion, handleOnRegistrar, handleInputChange, irIniciarSesion, irRegistrar }) {
    return (
        <form
            className={styles.formularioContenedor}
            onSubmit={isInicioSesion ? handleOnIniciarSesion : handleOnRegistrar}
        >
            {/* Nombre de usuario*/}
            <label
                className={styles.labelFormulario}
            >{isInicioSesion ? 'Usuario' : 'Escribe aquí tu nombre de usuario'}
            </label>
            <input
                className={styles.inputFormulario}
                onChange={handleInputChange}
                type='text'
                name='nombre'
                value={usuario ? usuario.nombre : ''}
                placeholder='Nombre de usuario'
                required
                maxLength={25}
            ></input>

            {/* Contraseña */}
            <label
                className={styles.labelFormulario}
            >{isInicioSesion ? 'Contraseña' : 'Escribe aquí tu contraseña'}
            </label>
            <input
                className={styles.inputFormulario}
                onChange={handleInputChange}
                value={usuario ? usuario.contrasena : ''}
                type='password'
                name='contrasena'
                placeholder='Contraseña'
                required
            ></input>

            {/* Botones */}
            <button
                className={styles.botonFormularioOK}
                type="submit"
            >{isInicioSesion ? 'Iniciar Sesión' : 'Guardar'}</button>

            <button
                className={styles.botonFormularioSecundario}
                type="button"
                onClick={isInicioSesion ? irRegistrar : irIniciarSesion}
            >{isInicioSesion ? 'Registrarse' : 'Acceder'}</button>

        </form>
    );
}

export default LoginForm;