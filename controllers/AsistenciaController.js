import jwt from 'jsonwebtoken';
import { TablaAsistencia } from '../models/ModelAsistencia.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
export const registrarAsistencia = async (req, res) => {
    const { qrToken } = req.body;
    try {
        // Decodifica el token JWT
        const decoded = jwt.verify(qrToken, secretKey);

        // Obtener fecha y hora en formato adecuado
        const fechaActual = new Date();
        // 2024-03-24T08:00:00.000Z --- T es el delimitador que separa la fecha de la hora.
        const fecha = fechaActual.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
        const hora = fechaActual.toTimeString().split(' ')[0]; // Formato 'HH:MM:SS'

        // Crear una nueva entrada en la tabla de asistencias
        // Cambia 'Fecha' a 'fecha' y 'HoraLlegada' a 'horallegada'
        const nuevaAsistencia = await TablaAsistencia.create({
            profesorid: decoded.id,
            fecha: fecha,           // En minúsculas según el modelo
            horallegada: hora       // En minúsculas según el modelo
        });
     
        // Responder con éxito
        return res.status(200).json({
            message: 'Asistencia registrada con éxito', nuevaAsistencia
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // Error si el token es inválido o expirado
            return res.status(403).json({ message: 'Token inválido o expirado' });
        } else {
            // Error general
            console.error('Error al registrar asistencia:', error);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    }
};

export const contarAsistenciasEinasistencias = async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authorization.split(' ')[1];
    console.log(authorization);
    console.log(token);

    try {
        const decoded = jwt.verify(token, secretKey);  // Verificar el token
        const profesorId = decoded.id;  // Obtener el ID del profesor

        // Lógica para contar asistencias e inasistencias
        const totalAsistencias = await TablaAsistencia.count({ where: { profesorid: profesorId } });
        const totalInasistencias = await TablaAsistencia.count({ where: { profesorid: profesorId, inasistencias: true } });

        return res.status(200).json({
            message: `Totales de asistencias e inasistencias del profesor con ID ${profesorId}`,
            asistencias: totalAsistencias,
            inasistencias: totalInasistencias
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ message: 'Token expirado, por favor inicia sesión de nuevo' });
        } else {
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }
    }
};
