import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const secretKey = process.env.SECRET_KEY;

const verificarToken = (req, res, next) => {
  // Tomar token desde encabezado Authorization
  let token = req.headers['authorization']?.split(' ')[1];
  
  // Si no se encuentra en el header, buscar en el cuerpo de la solicitud
  if (!token) {
    token = req.body.token || req.query.token;  // Búsqueda adicional en el cuerpo o en los query params
  }

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.userId = decoded.id;
    next();
  });
};


export default verificarToken;
