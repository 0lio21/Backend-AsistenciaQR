import express from 'express';
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, updateprofesor } from '../controllers/ProfesorController.js';
import login from '../controllers/LoginController.js';
import { contarAsistenciasEinasistencias, registrarAsistencia } from '../controllers/AsistenciaController.js';
import { ListadoCursos, crearCurso } from '../controllers/CursosController.js';
import { insertarHorario, mostrarhorariocurso, mostrarhorarioprofesor } from '../controllers/HoriariosController.js';
import { insertarMateria, ListadoMaterias } from '../controllers/MateriasController.js';
import verificarToken from '../Middlewares/verificarToken.js';

const router = express.Router();

//http://localhost:8000/api

/* Rutas para Profesores */

// Obtiene todos los profesores, protegido con el middleware para verificar el token
router.get('/profesores', verificarToken, getAllprofesores);
// Obtiene un profesor por su ID, protegido con el middleware de verificación de token
router.get('/profesores/:id', verificarToken, getprofesor);
// Crea un nuevo profesor, protegido con el middleware de verificación de token
router.post('/profesores', verificarToken, createprofesor);
// Actualiza un profesor por su ID, protegido con el middleware de verificación de token
router.put('/profesores/:id', verificarToken, updateprofesor);
// Elimina un profesor por su ID, protegido con el middleware de verificación de token
router.delete('/profesores/:id', verificarToken, deleteprofesor);

/* Ruta de Login */
router.post('/login', login);  // Inicia sesión y genera un token JWT


/* Rutas para Asistencia */
// Registra la asistencia de un profesor (requiere que el profesor esté autenticado mediante el token)
router.post('/login/asistencia', verificarToken, registrarAsistencia);
// Cuenta las asistencias e inasistencias de un profesor autenticado mediante el token
router.get('/login/contarasistencias', verificarToken, contarAsistenciasEinasistencias);


/* Rutas para Cursos */
// Lista todos los cursos disponibles, protegido con middleware de verificación de token
router.get('/listado/cursos', verificarToken, ListadoCursos);
// Crea un nuevo curso, protegido con el middleware de verificación de token
router.post('/crear/curso', verificarToken, crearCurso);


/* Rutas para Horarios */
// Inserta un nuevo horario para un curso y profesor, protegido con el middleware de verificación de token
router.post('/insertar/horario', verificarToken, insertarHorario);
// Muestra los horarios de un profesor por su ID, protegido con middleware de verificación de token
router.get('/listado/horario/profesor', verificarToken, mostrarhorarioprofesor);
// Muestra los horarios de un curso por su ID, protegido con middleware de verificación de token
router.get('/listado/horario/curso', verificarToken, mostrarhorariocurso);


/* Rutas para Materias */
// Inserta una nueva materia, protegido con middleware de verificación de token
router.post('/insertar/materias', verificarToken, insertarMateria);
// Lista todas las materias disponibles, protegido con middleware de verificación de token
router.get('/listado/materias', verificarToken, ListadoMaterias);


// Exportamos el router
export default router;
