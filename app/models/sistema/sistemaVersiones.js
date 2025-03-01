const db = require("../../db/db");

const getTablaExiste = async (req, res) => {
  query = {
    text: `SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'sistema'
          AND table_name = 'sistema_versiones'
        ) as existe;`,
    values: [],
  };
  return await db.consultaSistema(req, res, query);
};

const getUltimaVersion = async (req, res) => {
  query = {
    text: `SELECT nro_version FROM sistema.sistema_versiones ORDER BY fecha_version DESC LIMIT 1;`,
    values: [],
  };
  return await db.consultaSistema(req, res, query);
};

module.exports = {
  getTablaExiste,
  getUltimaVersion,
};
