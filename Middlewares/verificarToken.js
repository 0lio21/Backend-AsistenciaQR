import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const secretKey = process.env.SECRET_KEY;

const verificarToken = (req, res, next) => {
  let token = req.headers['authorization']?.split(' ')[1];  // Tomar token de Authorization
  
  if (!token) {
    token = req.query.token || req.body.token || req.cookies.token;  // Buscar token en otras partes
  }

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.userId = decoded.id;
    next();
  });
};


export default verificarToken;
