// routes/routesProfesor.js
import express from 'express';
import { contarAsistenciasEinasistencias, registrarAsistencia } from '../controllers/AsistenciaController.js';
import { mostrarhorarioprofesor } from '../controllers/HoriariosController.js';
import verificarToken from '../Middlewares/verificarToken.js';
import { checkRole } from '../Middlewares/checkRole.js';

const routerProfesor = express.Router();

// Rutas de asistencia para profesores
routerProfesor.post('/login/asistencia', verificarToken, checkRole('profesor'), registrarAsistencia);
routerProfesor.get('/login/contarasistencias', verificarToken, checkRole('profesor'), contarAsistenciasEinasistencias);

// Rutas de horario para profesores
routerProfesor.get('/listado/horario/profesor', verificarToken, checkRole('profesor'), mostrarhorarioprofesor);

export default routerProfesor;
