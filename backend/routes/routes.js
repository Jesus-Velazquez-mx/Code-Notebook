import { Router } from 'express';
/* Importar controladores */
import categoriaController from '../controllers/categoriaController.js';
import notaController from '../controllers/notaController.js';
import usuarioController from '../controllers/usuarioController.js';
/* Importar el middleware */
import { verificarToken } from '../middlewares/validarToken.js'

const { listarCategorias, crearCategoria, borrarCategoria, editarCategoria } = categoriaController;
const { listarNotas, listarUltimasNotas, listarTodasLasNotas, crearNota, borrarNota, editarNota } = notaController;
const { iniciarSesion, registrar } = usuarioController;

const router = Router();

/* Rutas */
/* Usuarios */
router.post('/iniciarSesion', iniciarSesion);
router.post('/registrar', registrar);

/* Categorias */
router.get('/listarCategorias', verificarToken, listarCategorias);
router.post('/crearCategoria', verificarToken, crearCategoria);
router.delete('/borrarCategoria', verificarToken, borrarCategoria);
router.put('/editarCategoria', verificarToken, editarCategoria);


/* Notas */
router.post('/listarNotas', verificarToken, listarNotas);
router.get('/listarUltimasNotas', verificarToken, listarUltimasNotas);
router.get('/listarTodasLasNotas', verificarToken, listarTodasLasNotas);


router.post('/crearNota', verificarToken, crearNota);
router.delete('/borrarNota', verificarToken, borrarNota);
router.put('/editarNota', verificarToken, editarNota)


export default router;