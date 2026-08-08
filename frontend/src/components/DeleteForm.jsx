import React from 'react';
import styles from '../styles/LoginForm.module.css'

function DeleteForm({ isNota, handleOnBorrarNota, handleOnBorrarCategoria, handleOnClose }) {
    return (
        <form
            className={styles.formularioContenedor}
            onSubmit={isNota ? handleOnBorrarNota : handleOnBorrarCategoria}
        >
            {/* Mensaje de borrar */}
            <label
                className={styles.labelFormulario}
            >{isNota ? '¿Estás seguro de borrar la nota?' : '¿Estás seguro de borrar la categoría?'}
            </label>

            {/* Botones */}
            <button
                className={styles.botonFormularioOK}
                type="submit"
            >Borrar</button>

            <button
                className={styles.botonFormularioSecundario}
                type="button"
                onClick={handleOnClose}
            >Cancelar</button>

        </form>
    )
}

export default DeleteForm;