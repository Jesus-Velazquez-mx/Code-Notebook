import db from '../database/database.js';
import { z } from 'zod';

const notaScheme = z.object({
    titulo: z.string().min(1).max(50),
    subtitulo: z.string().max(50).optional(),
    contenido: z.string().trim().min(1),
    categoria_id: z.number()
})


/* Para ver todas las notas por categoria */
const listarNotas = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;
    const { categoria_id } = req.body;

    const sqlVerNotas = `SELECT * FROM NOTAS WHERE usuario_id = ? AND categoria_id = ?`;

    db.all(sqlVerNotas, [usuario_id, categoria_id], (err, rows) => {
        if (err) {
            console.log("No se encontraron las notas", err.message);
            return res.status(401).json({ error: "Notas no encontradas" });
        } else {
            res.status(200).json(rows);
        }
    })
}

/* Para ver todas las útlimas notas */
const listarUltimasNotas = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;
    const sqlVerNotas = `SELECT * FROM NOTAS WHERE usuario_id = ?
    ORDER BY fecha_creacion DESC LIMIT 15`;

    db.all(sqlVerNotas, [usuario_id, categoria_id], (err, rows) => {
        if (err) {
            console.log("No se encontraron las notas", err.message);
            return res.status(401).json({ error: "Notas no encontradas" });
        } else {
            res.status(200).json(rows);
        }
    })
}

/* Para crear una nota */
const crearNota = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;

    const resultadoZod = notaScheme.safeParse(req.body);
    if (!resultadoZod.success) {
        return res.status(400).json({ error: "Datos de nota inválidos" });
    }
    const { titulo, subtitulo, contenido, categoria_id } = resultadoZod.data;

    const sqlCrearNota = `INSERT INTO NOTAS (titulo, subtitulo, contenido,
       usuario_id, categoria_id) VALUES (?, ?, ?, ?, ?)`

    db.run(sqlCrearNota, [titulo, subtitulo, contenido, usuario_id, categoria_id], (err) => {
        if (err) {
            console.log("No se pudo insertar la nota", err.message);
            return res.status(401).json({ error: "Error al crear la nota" });
        } else {
            res.status(201).json({ mensaje: "Nota agregada correctamente" })
        }
    });
}

/* Para borrar una nota */
const borrarNota = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;
    const { id } = req.body;

    const sqlBorrarNota = `DELETE FROM NOTAS WHERE usuario_id = ? AND id = ?`;

    db.run(sqlBorrarNota, [usuario_id, id], (err) => {
        if (err) {
            console.log("No se pudo borrar la nota", err.message);
            return res.status(401).json({ error: "Nota no encontrada" });
        } else {
            res.status(200).json({ mensaje: "Nota borrada correctamente" })
        }
    })
}

/* Para editar una nota */
const editarNota = (req, res) => {
    const usuario_id = req.usuarioLogueado.id;
    const { id } = req.body;
    const resultadoZod = notaScheme.safeParse(req.body);
    if (!resultadoZod.success) {
        return res.status(400).json({ error: "Datos de nota inválidos" });
    }
    const { titulo, subtitulo, contenido, categoria_id } = resultadoZod.data;

    const sqlEditarNota = `
        UPDATE NOTAS 
        SET titulo = ?, subtitulo = ?, contenido = ?, categoria_id = ? 
        WHERE id = ? AND usuario_id = ?
    `;

    db.run(sqlEditarNota, [titulo, subtitulo, contenido, categoria_id, id, usuario_id], (err) => {
        if (err) {
            console.log("No se pudo editar la nota", err.message);
            return res.status(500).json({ error: "Error al editar la nota" });
        } else {
            res.status(200).json({ mensaje: "Nota editada correctamente" });
        }
    });
}

export default { listarNotas, crearNota, borrarNota, editarNota }