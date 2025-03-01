const db = require("../../db/db");

const getBaseExiste = async (dbName) => {
  query = {
    text: `SELECT 1 FROM pg_database WHERE datname = $1;`,
    values: [dbName],
  };
  return await db.consultaPostgres(null, null, query);
};

const createBase = async (dbName) => {
  query = {
    text: `CREATE DATABASE ${dbName};`,
    values: [],
  };
  return await db.consultaPostgres(null, null, query);
};

module.exports = {
  getBaseExiste,
  createBase,
};
