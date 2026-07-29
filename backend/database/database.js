import sqlite3 from 'sqlite3'

/* Regresa la instancia y la abre, si no existe, la crea */
/* new sqlite3.Database(filename [, mode] [, callback])*/
const db = new sqlite3.Database('./data/codeNotebook.sqlite', (err) => {
    if (err) {
        console.error('Error abriendo la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

/* serialize([callback]) */
/* run(sql [, param, ...] [, callback]) */
db.serialize(() => {
    const sqlUsuario = `CREATE TABLE IF NOT EXISTS USUARIOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(25) UNIQUE NOT NULL ,
    contrasena TEXT NOT NULL
)`
    db.run(sqlUsuario, (err) => {
        if (err) {
            console.log("Se ha producido un error al crear la tabla de USUARIOS " + err.message);
        } else {
            console.log("Tabla USUARIOS lista para usarse")
        }
    });

    const sqlCategoria = `CREATE TABLE IF NOT EXISTS CATEGORIAS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(25) NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
)`
    db.run(sqlCategoria, (err) => {
        if (err) {
            console.log("Se ha producido un error al crear la tabla de CATEGROIAS ", err.message);
        } else {
            console.log("Tabla CATEGORIAS lista para usarse")
        }
    });


    const sqlNotas = `CREATE TABLE IF NOT EXISTS NOTAS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(50) NOT NULL,
    subtitulo VARCHAR(50) NULL,
    contenido TEXT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES CATEGORIAS(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES USUARIOS(id) ON DELETE CASCADE
)`
    db.run(sqlNotas, (err) => {
        if (err) {
            console.log("Se ha producido un error al crear la tabla de NOTAS ", err.message);
        } else {
            console.log("Tabla NOTAS lista para usarse")
        }
    });


})


export default db;
