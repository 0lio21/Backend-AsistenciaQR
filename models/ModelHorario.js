// Importamos la conexión a la DB
import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Modelo para la tabla 'horarios'
const TablaHorario = db.define('horarios', {
  horarioid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cursoid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cursos',
      key: 'cursoid'
    }
  },
  profesorid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'profesores',
      key: 'id'
    }
  },
  materiaid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'materias',
      key: 'materiaid'
    }
  },
  dia: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  fechainicio: {
    type: DataTypes.TIME,
    allowNull: true
  },
  fechafin: {
    type: DataTypes.TIME,
    allowNull: true
  }
}, {
  timestamps: false
});

export default TablaHorario;
