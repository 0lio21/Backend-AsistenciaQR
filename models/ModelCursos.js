// Importamos la conexión a la DB
import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Modelo para la tabla 'cursos'
const TablaCurso = db.define('cursos', {
  cursoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  division: {
    type: DataTypes.STRING(10),
    allowNull: true
  }
}, {
  timestamps: false
});

export default TablaCurso;
