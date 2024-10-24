import { TablaProfesor } from '../models/ModelProfesor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;  

export const login = async (req, res) => {
  const { correo, password } = req.body;
  console.log(correo, password);
  try {
      const profesor = await TablaProfesor.findOne({ where: { correo } });

      if (!profesor) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const validPassword = await bcrypt.compare(password, profesor.password);
      if (!validPassword) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
                                    /*header*/    /*secretkey*/   /*expiracion */
      const token = jwt.sign({ id: profesor.id }, secretKey, { expiresIn: '20m' });  // Token con 20 minutos de duración

      return res.status(200).json({ token, decoded });
  } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export default login;




