import express from 'express';
import cors from 'cors';
import db from '../database/database.js';
import router from '../routes/routes.js';

/* Para el deployment */
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* Crear instancia de la aplicación Express */
const app = express();
const PORT = 3000;

/* app.use([ruta_opcional], middleware_o_router) */
/* Un middleware es una función que se ejecuta antes de llegar a la ruta */

/* Permitir solicitudes desde cualquier origen (CORS) */
app.use(cors());
/* Retornar JSON en las respuestas */
app.use(express.json());
/* Usar las rutas definidas en router */
app.use('/api', router);

/* Buscamos el dist */
const distPath = path.join(__dirname, '../../dist');

/* Decimos a express que sirva en la carpeta 'dist', que es donde vivirá el React comiplado*/
app.use(express.static(distPath));

/* Cualquier ruta que no esté aquí se la mandamos a React */
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

/* listen(port: number, [callback]*/
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});