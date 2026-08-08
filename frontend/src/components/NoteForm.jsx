import React from 'react';
import styles from '../styles/LoginForm.module.css'


function NoteForm({ nota, categorias, handleOnCrearNota, handleOnEditarNota, isEditar, handleInputChange, handleOnClose }) {
    return (
        <form
            className={styles.formularioContenedor}
            onSubmit={isEditar ? handleOnEditarNota : handleOnCrearNota}
        >
            {/* Título */}
            <label
                className={styles.labelFormulario}
            >Título de la nota
            </label>
            <input
                className={styles.inputFormulario}
                onChange={handleInputChange}
                type='text'
                name='titulo'
                value={nota ? nota.titulo : ''}
                placeholder='Título de la nota'
                required
                maxLength={25}
            ></input>

            {/* Subtitulo */}
            <label
                className={styles.labelFormulario}
            >Subtítulo de la nota
            </label>
            <input
                className={styles.inputFormulario}
                onChange={handleInputChange}
                type='text'
                name='subtitulo'
                value={nota ? nota.subtitulo : ''}
                placeholder='Subtítulo de la nota'
                required
                maxLength={25}
            ></input>

            {/* Categoría */}
            <label className={styles.labelFormulario}
            >Categoría</label>
            <select
                className={styles.inputFormulario}
                onChange={handleInputChange}
                name='categoria_id'
                value={nota && nota.categoria_id ? nota.categoria_id : ''}
                required
            >
                <option value="" disabled>Selecciona una categoría</option>
                {categorias && categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                    </option>
                ))}
            </select>

            {/* Contenido */}
            <label
                className={styles.labelFormulario}
            >Contenido
            </label>
            <textarea
                className={styles.inputFormulario}
                onChange={handleInputChange}
                name='contenido'
                value={nota ? nota.contenido : ''}
                placeholder='Escribe el contenido de tu nota aquí...'
                required
            ></textarea>

            {/* Botones */}
            <button
                className={styles.botonFormularioOK}
                type="submit"
            >{isEditar ? 'Guardar ' : 'Crear'}</button>

            <button
                className={styles.botonFormularioSecundario}
                type="button"
                onClick={handleOnClose}
            >Cancelar</button>

        </form>
    )
}

export default NoteForm;