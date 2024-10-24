import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import pg from "pg"
import mysql2 from 'mysql2';  // Importa mysql2 usando ES Modules

dotenv.config();
const bd = process.env.POSTGRES_DATABASE;
const usuario = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const hostvercel = process.env.POSTGRES_HOST;

 const db = new Sequelize(bd, usuario, password,{
host:hostvercel,
    dialect: 'postgres',
    dialectModule:pg,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // puedes cambiar esto según tu configuración de SSL
        }
      }
    }) 

/* const db = new Sequelize('bdtecnica', 'root', '1234', {
  host: 'localhost',   // El host de MySQL, cámbialo si es diferente
  dialect: 'mysql',    // Dialecto para MySQL
  dialectModule: mysql2,  // Usando el paquete mysql2
  dialectOptions: {
    ssl: {
      require: false, // O true si necesitas SSL
      rejectUnauthorized: false  // Cambia según la configuración de SSL
    }
  },
}); */
     

export default db;

