
export const checkRole = (role) => {
    return (req, res, next) => {
      const { rol } = req.user; // Suponiendo que tienes al usuario autenticado en `req.user`
      
      if (rol === role) {
        next(); // El rol coincide, continuar
      } else {
        return res.status(403).json({
          message: 'Acceso denegado. No tienes permisos suficientes.'
        });
      }
    };
  };
  