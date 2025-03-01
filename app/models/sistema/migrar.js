const db = require("../../db/db");

const migrar = async (sql) => {
  query = {
    text: sql,
    values: [],
  };
  return await db.consultaSistema(null, null, query);
};

module.exports = {
  migrar,
};
