// routes/routesAdmin.js
import express from 'express';
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, updateprofesor } from '../controllers/ProfesorController.js';
import { insertarHorario } from '../controllers/HoriariosController.js';
import verificarToken from '../Middlewares/verificarToken.js';
import { checkRole } from '../Middlewares/checkRole.js';
import { crearCurso, ListadoCursos } from '../controllers/CursosController.js';
import { insertarMateria } from '../controllers/MateriasController.js';

const routerAdmin = express.Router();

// Rutas de administración de profesores
routerAdmin.get('/profesores', verificarToken, checkRole('admin'), getAllprofesores);
routerAdmin.get('/profesores/:id', verificarToken, checkRole('admin'), getprofesor);
routerAdmin.post('/profesores', verificarToken, checkRole('admin'), createprofesor);
routerAdmin.put('/profesores/:id', verificarToken, checkRole('admin'), updateprofesor);
routerAdmin.delete('/profesores/:id', verificarToken, checkRole('admin'), deleteprofesor);

// Rutas de administración de cursos y horarios
routerAdmin.post('/insertar/horario', verificarToken, checkRole('admin'), insertarHorario);
routerAdmin.post('/crear/curso', verificarToken, checkRole('admin'), crearCurso);
routerAdmin.get('listado/cursos', verificarToken, checkRole('admin'), ListadoCursos);
routerAdmin.post('/insertar/materias', verificarToken, checkRole('admin'), insertarMateria);

export default routerAdmin;
