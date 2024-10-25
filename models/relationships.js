import TablaCurso from './ModelCursos.js';
import TablaHorario from './ModelHorario.js';
import TablaMateria from './ModelMateria.js';
import TablaProfesor from './ModelProfesor.js'

// Definir relaciones
TablaCurso.hasMany(TablaHorario, { foreignKey: 'cursoid' });
TablaMateria.hasMany(TablaHorario, { foreignKey: 'materiaid' });
TablaProfesor.hasMany(TablaHorario, { foreignKey: 'profesorid' });

TablaHorario.belongsTo(TablaCurso, { foreignKey: 'cursoid' });
TablaHorario.belongsTo(TablaMateria, { foreignKey: 'materiaid' });
TablaHorario.belongsTo(TablaProfesor, { foreignKey: 'profesorid' });

export default {
  TablaCurso,
  TablaHorario,
  TablaMateria,
  TablaProfesor
};
