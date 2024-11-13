// Importa el modelo
import TablaMateria from '../models/ModelMateria.js';

// Función para insertar una nueva materia
export const insertarMateria = async (req, res) => {
    const { nombremateria } = req.body;  // Extraer NombreMateria del cuerpo de la petición
    try {
      // Inserta la nueva materia
      const nuevaMateria = await TablaMateria.create({
        NombreMateria: nombremateria  // Usar NombreMateria correctamente
      });
  
      console.log('Materia insertada exitosamente:', nuevaMateria);
      res.status(201).json({ message: 'Materia insertada exitosamente', nuevaMateria });
    } catch (error) {
      console.error('Error al insertar la materia:', error);
      res.status(500).json({ error: 'Error al insertar la materia' });
    }
  };

export const ListadoMaterias = async (req, res) => {
    try {
      const materias = await TablaMateria.findAll();
      res.json(materias);
    } catch (error) {
      
    }
}

export const eliminarMateria = async (req, res) => {
  const { materiaId } = req.params; // Obtener el ID de la materia desde los parámetros de la URL

  try {
      // Buscar la materia por ID
      const materia = await TablaMateria.findByPk(materiaId);

      // Verificar si la materia existe
      if (!materia) {
          return res.status(404).json({ error: 'Materia no encontrada' });
      }

      // Eliminar la materia
      await materia.destroy();

      // Responder con éxito
      res.status(200).json({ message: 'Materia eliminada exitosamente' });
  } catch (error) {
      console.error('Error al eliminar la materia:', error);
      res.status(500).json({ error: 'Error al eliminar la materia' });
  }
};


