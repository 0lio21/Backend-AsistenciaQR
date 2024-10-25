import { TablaProfesor } from '../models/ModelProfesor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
      const profesor = await TablaProfesor.findOne({ where: { correo } });

      if (!profesor) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const validPassword = await bcrypt.compare(password, profesor.password);
      if (!validPassword) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ id: profesor.id, rol: profesor.rol }, secretKey, { expiresIn: '20m' });
      return res.status(200).json({
        nombre: profesor.nombre,
        apellido: profesor.apellido,
        token: token
      });

  } catch (error) {
      console.error('Error en el servidor:', error);  // Para depurar errores en la consola
      return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export default login;
