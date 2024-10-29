import TablaCurso from '../models/ModelCursos.js'
import { TablaProfesor } from '../models/ModelProfesor.js';
import TablaHorario from '../models/ModelHorario.js';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import TablaMateria from '../models/ModelMateria.js';

// Funcion para formatear el tiempo en HH:MM si es necesario
function formatTime(time) {
  // Si ya tiene el formato HH:MM, retorna tal cual, sino lo ajusta
  return time.length === 5 ? time + ":00" : time;
}


export const insertarHorario = async (req, res) => {
  const { profesorid, cursoid, materiaid, dia, fechainicio, fechafin } = req.body;

  try {
    // Crear un nuevo horario en la tabla 'horarios'
    const nuevoHorario = await TablaHorario.create({
      profesorid: profesorid,
      cursoid: cursoid,
      materiaid: materiaid,
      dia: dia,
      fechainicio: fechainicio,
      fechafin: fechafin
    });

    // Responder con éxito
    res.status(200).json({
      message: 'Horario insertado exitosamente',
      data: nuevoHorario
    });
  } catch (error) {
    console.error('Error al insertar el horario:', error);
    res.status(500).json({
      message: 'Error al insertar el horario',
      error: error.message
    });
  }
};



export const mostrarhorarioprofesor = async (req, res) => {
  try {
    const profesorId = req.user.id; // Ahora usamos el ID del token

    // Buscar el profesor por ID
    const profesor = await TablaProfesor.findByPk(profesorId);

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Obtener los horarios del profesor
    const horarios = await TablaHorario.findAll({
      where: { profesorid: profesorId }
    });

    return res.json(horarios);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    return res.status(500).json({ error: 'Error al obtener horarios' });
  }
};



export const mostrarhorariocurso = async (req, res) => {
  try {
    const { cursoId } = req.body;

    // Buscar el curso por ID
    const curso = await TablaCurso.findByPk(cursoId);

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Obtener los horarios del curso
    const horarios = await TablaHorario.findAll({
      where: { cursoid: cursoId },
      include: [{ model: TablaProfesor }, { model: TablaMateria }]
    });

    return res.json(horarios);
  } catch (error) {
    console.error('Error al obtener horarios:', error);
    return res.status(500).json({ error: 'Error al obtener horarios' });
  }
};




















