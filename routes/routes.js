import express from 'express'
import { createprofesor, deleteprofesor, getAllprofesores, getprofesor, updateprofesor } from "../controllers/ProfesorController.js"
import login from '../controllers/LoginController.js';
import {contarAsistenciasEinasistencias, registrarAsistencia, } from '../controllers/AsistenciaController.js';

const router = express.Router();

router.get('/', getAllprofesores);
router.get('/:id', getprofesor);
router.post('/', createprofesor);
router.put('/:id', updateprofesor);
router.delete('/:id', deleteprofesor);
router.post('/login', login);
router.post('/login/asistencia', registrarAsistencia);
router.get('/login/contarAsistencias/:profesorId', contarAsistenciasEinasistencias);

export default router;







