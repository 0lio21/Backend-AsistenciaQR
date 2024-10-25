import express from 'express';
import cors from 'cors';
import db from "./database/db.js";//base de datos
import login from './controllers/LoginController.js';
import routerAdmin from './routes/routesAdmin.js';
import routerProfesor from './routes/routesProfesor.js';

const app = express();

const corsOptions = {
    origin: ['https://proyecto-asistencia-qr.vercel.app', 'https://proyecto-lector-asistencia-qr.vercel.app'],
    credentials: true // Esto permitirá las credenciales (cookies, etc.)
};


app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());

// Rutas de autenticación
app.post('/api/login', login);

// Rutas de admin y profesor
app.use('/api/admin', routerAdmin);      // Rutas exclusivas para administradores
app.use('/api/profesor', routerProfesor); // Rutas exclusivas para profesores

try {
    db.authenticate();
    console.log('Conexion exitosa a la Base De Datos');
    console.log(`Listo para recibir Solicitudes`);
} catch (error) {
    console.log(`El error de conexion es: ${error}`);
}

app.get("/", (req, res) => {
    res.send(`App is working fine`);
  });

app.listen(8000, () => {
    console.log(' Server UP running in http://localhost:8000/');
});
