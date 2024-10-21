import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const secretKey = process.env.SECRET_KEY;

 const verificarToken = (req, res, next) => {
  const autorizacion = req.headers['authorization'];  // Obtiene el encabezado de autorización
  if (!autorizacion) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = autorizacion.split(' ')[1];  // Extraer el token del encabezado

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.id;  // Guarda el ID del usuario decodificado en la solicitud
    next();  // Continuar con la solicitud si el token es valido
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

export default verificarToken;
