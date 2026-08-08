import db from '../database/database.js'
import { z } from 'zod'

const categoriaScheme = z.object({
    nombre: z.string().min(1).max(25)
});

/* Listar todas las categorías del usuario logueado */
const listarCategorias = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;

    const sqlCategoria = `SELECT * FROM CATEGORIAS WHERE usuario_id = ?`
    db.all(sqlCategoria, [usuario_id], (err, rows) => {
        if (err) {
            console.log("No se encontraron categorías", err.message);
            return res.status(401).json({ error: "Categorías no encontradas" });
        } else {
            /* Guarda todas las rows*/
            res.status(200).json(rows);
        }
    })
}

/* Para crear categorías */
const crearCategoria = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;

    const resultadoZod = categoriaScheme.safeParse(req.body);
    if (!resultadoZod.success) {
        return res.status(400).json({ error: "Datos de categoría inválidos" });
    }
    const { nombre } = resultadoZod.data;

    const sqlCrearCategoria = `INSERT INTO CATEGORIAS (nombre, usuario_id) VALUES (?,?)`

    db.run(sqlCrearCategoria, [nombre, usuario_id], function (err) {
        if (err) {
            console.log("No se pudo insertar la categoría", err.message);
            return res.status(401).json({ error: "Error al crear la categoría" });
        } else {
            const categoriaCreada = {
                id: this.lastID,
                nombre,
                usuario_id
            };
            res.status(201).json({
                mensaje: "Categoría agregada correctamente",
                categoria: categoriaCreada
            });
        }
    })

}

/* Para borrar categorías */
const borrarCategoria = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;
    const { id } = req.body;
    const sqlBorrarCategoria = `DELETE FROM CATEGORIAS WHERE id = ? AND usuario_id = ?`

    db.run(sqlBorrarCategoria, [id, usuario_id], function (err) {
        if (err) {
            console.log("No se pudo borrar la categoría", err.message);
            return res.status(500).json({ error: "Error al intentar borrar la categoría" });
        }
        /* Manda un mensaje de éxito */
        res.status(200).json({ mensaje: "Categoría borrada correctamente" })
    });
}

/* Para editar categorías */
const editarCategoria = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;
    const { categoria_id } = req.body;
    const resultadoZod = categoriaScheme.safeParse(req.body);
    if (!resultadoZod.success) {
        return res.status(400).json({ error: "Datos de categoría inválidos" });
    }
    const { nombre } = resultadoZod.data;
    const sqlEditarCategoria = `UPDATE CATEGORIAS SET nombre = ? WHERE id = ? AND usuario_id = ?`;

    db.run(sqlEditarCategoria, [nombre, categoria_id, usuario_id], (err) => {
        if (err) {
            console.log("No se pudo editar la categoría", err.message);
            return res.status(500).json({ error: "Error al editar la categoría" });
        } else {
            /* Manda un mensaje de éxito */
            res.status(200).json({ mensaje: "Categoría editada correctamente" });
        }
    });
}

export default { listarCategorias, crearCategoria, borrarCategoria, editarCategoria }