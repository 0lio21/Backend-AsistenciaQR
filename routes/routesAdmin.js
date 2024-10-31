// routes/routesAdmin.js
import express from 'express';
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, updateprofesor } from '../controllers/ProfesorController.js';
import { insertarHorario, eliminarHorario, mostrarhorariocurso, mostrarhorarioprofesor, mostrarTodosLosHorarios } from '../controllers/HoriariosController.js';
import verificarToken from '../Middlewares/verificarToken.js';
import { checkRole } from '../Middlewares/checkRole.js';
import { crearCurso, ListadoCursos } from '../controllers/CursosController.js';
import { insertarMateria, ListadoMaterias, eliminarMateria } from '../controllers/MateriasController.js';

const routerAdmin = express.Router();

/* TODO ES /api/admin */

/* Ejemplo de credenciales para autenticación:
{
    "correo": "equipodirectivo@example.edu.ar",
    "password": "tecnica4"
}
*/

// Rutas de administración de profesores
routerAdmin.get('/profesores', verificarToken, checkRole('admin'), getAllprofesores); // ver todos los profesores
routerAdmin.get('/profesores/:id', verificarToken, checkRole('admin'), getprofesor); // ver un profesor específico
routerAdmin.post('/profesores', verificarToken, checkRole('admin'), createprofesor); // crear un nuevo profesor
routerAdmin.put('/profesores/:id', verificarToken, checkRole('admin'), updateprofesor); // actualizar datos de un profesor
routerAdmin.delete('/profesores/:id', verificarToken, checkRole('admin'), deleteprofesor); // eliminar un profesor

// Rutas de administración de cursos y horarios
routerAdmin.post('/crear/curso', verificarToken, checkRole('admin'), crearCurso); // crear curso
routerAdmin.get('/listado/cursos', verificarToken, checkRole('admin'), ListadoCursos); // ver todos los cursos
routerAdmin.post('/insertar/horario', verificarToken, checkRole('admin'), insertarHorario); // insertar horario
routerAdmin.delete('/horarios/:horarioId', verificarToken, checkRole('admin'), eliminarHorario); // borrar el horario
routerAdmin.get('/horarios/curso/:cursoId', verificarToken, checkRole('admin'), mostrarhorariocurso); // mostrar el horario de X curso
routerAdmin.get('/horarios/profesor/:profesorId', verificarToken, checkRole('admin'), mostrarhorarioprofesor); // mostrar el horario de X profesor
routerAdmin.get('/horarios', verificarToken, checkRole('admin'), mostrarTodosLosHorarios); // ver todos los horarios

// Rutas de administración de materias
routerAdmin.post('/insertar/materias', verificarToken, checkRole('admin'), insertarMateria); // crear una nueva materia
routerAdmin.delete('/materias/:materiaId', verificarToken, checkRole('admin'), eliminarMateria); // eliminar materia
routerAdmin.get('/listado/materias', verificarToken, checkRole('admin'), ListadoMaterias); // ver todas las materias


export default routerAdmin;
