export const checkRole = (role) => {
  return (req, res, next) => {
    const { rol } = req.user;
    
    if (rol === role) {
      next();
    } else {
      return res.status(403).json({
        message: 'Acceso denegado. No tienes permisos suficientes.'
      });
    }
  };
};
