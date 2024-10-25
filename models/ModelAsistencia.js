// Importamos la conexión a la base de datos
import db from "../database/db.js";
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
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  horallegada: {
    type: DataTypes.TIME,
    allowNull: true
  },
  inasistencias: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false,
  tableName: 'asistencias'
});

export default TablaAsistencia;
