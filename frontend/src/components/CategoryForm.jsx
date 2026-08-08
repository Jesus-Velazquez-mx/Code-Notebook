import React from 'react';
import styles from '../styles/LoginForm.module.css'


function CategoryForm({ categoria, handleOnCrearCategoria, handleOnEditarCategoria, isEditar, handleInputChange, handleOnClose }) {
    return (
        <form
            className={styles.formularioContenedor}
            onSubmit={isEditar ? handleOnEditarCategoria : handleOnCrearCategoria}
        >
            {/* Nombre de la categoría */}
            <label
                className={styles.labelFormulario}
            >Nombre de la categoría
            </label>
            <input
                className={styles.inputFormulario}
                onChange={handleInputChange}
                type='text'
                name='nombre'
                value={categoria ? categoria.nombre : ''}
                placeholder='Nombre de la categoría'
                required
                maxLength={25}
            ></input>


            {/* Botones */}
            <button
                className={styles.botonFormularioOK}
                type="submit"
            >{isEditar ? 'Guardar' : 'Crear'}</button>

            <button
                className={styles.botonFormularioSecundario}
                type="button"
                onClick={handleOnClose}
            >Cancelar</button>
        </form>
    )
}

export default CategoryForm;