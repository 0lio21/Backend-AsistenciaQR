// Importamos la conexión a la base de datos
import db from "../database/db.js";
// Importamos Sequelize
import { DataTypes } from "sequelize";

// Definición del modelo Asistencia
export const TablaAsistencia = db.define('asistencias', {
  asistenciaid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  profesorid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'profesores',  // Nombre de la tabla referenciada
      key: 'id'             // Columna de la tabla profesores que actúa como clave foránea
    }
  },
  fecha: {
    type: DataTypes.DATEONLY,  // Solo la parte de la fecha
    allowNull: false           // Cambiado a false si deseas que esta columna no sea nula
  },
  horallegada: {
    type: DataTypes.TIME,      // Solo la hora
    allowNull: true
  },
  inasistencias: {
    type: DataTypes.BOOLEAN,   // Tipo booleano para representar inasistencias
    defaultValue: false        // Valor por defecto: false (no inasistencias)
  }
}, {
  timestamps: false,           // Deshabilitar las columnas 'createdAt' y 'updatedAt'
  tableName: 'asistencias'     // Nombre explícito de la tabla en la base de datos
});

export default TablaAsistencia;
