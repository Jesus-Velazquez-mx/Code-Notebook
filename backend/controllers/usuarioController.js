/* db ya trae todos los métodos de sqlite3 */
import db from '../database/database.js'
import { z } from 'zod'
/* Para la encriptación de las contraseñas */
import bcrypt from 'bcrypt';
/* Para el token JWT */
import jwt from 'jsonwebtoken';

/* Esquema zod para las validaciones de los datos de los usuarios */
const usuarioScheme = z.object({
    nombre: z.string().min(3).max(25),
    contrasena: z.string().min(4).max(25)
})

/* Inicio de sesión */
const iniciarSesion = async (req, res) => {
    const resultadoZod = usuarioScheme.safeParse(req.body);
    if (!resultadoZod.success) {
        return res.status(400).json({ error: "Datos de usuario inválidos" });
    }
    const { nombre, contrasena } = resultadoZod.data;

    const sqlIniciarSesion = `SELECT * FROM USUARIOS WHERE nombre = ?`;

    db.get(sqlIniciarSesion, [nombre], async (err, usuario) => {
        /* Si no se puede hacer la consulta */
        if (err) {
            console.log("Error interno del servidor", err.message);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        /* Si no nos devuelve el usuario */
        if (!usuario) {
            console.log("Usuario o Contraseña incorrecto", err.message);
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        /* Si llegamos hasta aquí, significa que tenemos un usuario y vamos
            a validar la contraseña */
        try {
            /* await para que se espere a que compare las contraseñas antes de seguir */
            const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
            /* Si la contraseña es incorrecta */
            if (!passwordValida) {
                console.error("Contraseña incorrecta para el usuario:", usuario);
                return res.status(401).json({ error: "Usuario o Contraseña incorrectos" });
            }

            /* Definimos un objeto payload, que es como una credencial que contiene los datos del usuario */
            const payload = {
                id: usuario.id,
                nombre: usuario.nombre
            };

            /* Definimos la firma */
            const llaveSecreta = 'ClaveCodeNotebook123';

            /* Fabricamos el token. jwt.sign(payload, llave).*/
            const token = jwt.sign(payload, llaveSecreta, {
                expiresIn: '24h' // El gafete caduca en 1 día
            });

            /* Si llegamos hasta aquí, significa que pudimos iniciar sesión */
            res.status(200).json({ mensaje: "Inicio de sesión exitoso", token: token, usuario: { id: usuario.id, nombre: usuario.nombre } })

        } catch (error) {
            console.error("Error al comparar contraseñas:", error.message);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    })
}

/* Para registrar un usuario */
const registrar = async (req, res) => {
    const resultadoZod = usuarioScheme.safeParse(req.body)
    if (!resultadoZod.success) {
        return res.status(400).json({ error: "Datos de usuario inválidos" });
    }

    const { nombre, contrasena } = resultadoZod.data;

    try {
        /* Encriptamos la contraseña. Await para esperar que termine */
        const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
        const sqlRegistrar = `INSERT INTO USUARIOS (nombre, contrasena) VALUES (?, ?)`

        db.run(sqlRegistrar, [nombre, contrasenaEncriptada], function (err) {
            if (err) {
                /* Si la restricción UNIQUE se rompe (si se intenta registrar un usuario que ya existe)*/
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(409).json({ error: "Este usuario ya está registrado" });
                }
                console.log("Error al registrar al usuario", err.message)
                return res.status(500).json({ error: "Error al registrar al usuario" })
            } else {
                console.log("Se ha registrado el usuario correctamente")
                res.status(201).json({ id: this.lastID, nombre })
            }
        })
    } catch (error) {
        console.log("Error en la encriptación de la contraseña", err.message);
        return res.status(500).json({ error: "Error al registrar al usuario" });

    }
}

export default { iniciarSesion, registrar }
