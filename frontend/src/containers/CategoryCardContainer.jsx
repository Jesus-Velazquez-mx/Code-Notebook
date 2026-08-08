import React, { useState } from 'react'
import CategoryCard from '../components/CategoryCard'
import DeleteFormContainer from '../containers/DeleteFormContainer';
import styles from '../styles/CategoryCardContainer.module.css';



function CategoryCardContainer({ categorias, eliminarCategoriaDelEstado, handleEditarCategoria }) {
    const [categoriaParaBorrar, setCategoriaParaBorrar] = useState(null);

    return (
        <div>
            <div className={styles.contenedorCategoriasFlex}>                {categorias.map((categoria) => <CategoryCard
                key={categoria.id}
                categoria={categoria}
                handleOnClickEliminar={() => setCategoriaParaBorrar(categoria)}
                onClick={() => handleEditarCategoria(categoria)} />)
            }
            </div>
            {/* Modal de eliminación */}
            {categoriaParaBorrar && (
                <DeleteFormContainer
                    isNota={false}
                    categoria={categoriaParaBorrar}
                    nota={null}
                    handleOnClose={() => setCategoriaParaBorrar(null)}
                    eliminarCategoriaDelEstado={eliminarCategoriaDelEstado}
                />
            )}
        </div>

    )
}

export default CategoryCardContainer;