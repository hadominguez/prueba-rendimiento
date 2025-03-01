const db = require("../../db/db");

async function obtenerTamanoPostgreSQL() {
  let query = { text: "SELECT pg_size_pretty(pg_database_size(current_database())) AS size;", values: [] };
  let rows = await db.consultaSistema(null, null, query);
  console.log("Tamaño de la Base de Datos antes del VACUUM FULL (PostgreSQL):", rows[0].size);
  query = { text: "VACUUM FULL;", values: [] };
  await db.consultaSistema(null, null, query);
  query = { text: "SELECT pg_size_pretty(pg_database_size(current_database())) AS size;", values: [] };
  rows = await db.consultaSistema(null, null, query);
  console.log("Tamaño de la Base de Datos despues del VACUUM FULL (PostgreSQL):", rows[0].size);
  return rows[0].size;
}

module.exports = {
  obtenerTamanoPostgreSQL
};
