import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const secretKey = process.env.SECRET_KEY;

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const tokenWithoutBearer = authHeader.split(' ')[1]; // Asegúrate de obtener solo el token sin "Bearer"

    if (!tokenWithoutBearer) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    jwt.verify(tokenWithoutBearer, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        req.user = decoded; // Guardamos toda la información decodificada en req.user
        next(); // Llama al siguiente middleware o ruta
    });
};

export default verificarToken;

