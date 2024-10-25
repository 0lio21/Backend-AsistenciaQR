//ModelMateria
import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Modelo para la tabla 'materias'
const TablaMateria = db.define('materias', {
  materiaid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombremateria: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false
});

export default TablaMateria;
