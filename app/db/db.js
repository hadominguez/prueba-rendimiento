const { Pool } = require("pg");
const ConfigEnv = require("../config/config");
const mongoose = require('mongoose');
const logger = require("../utils/logger");
const util = require("util");

// Configuración de la conexión a PostgreSQL
const clientPostgres = new Pool({
  host: ConfigEnv.HOST_DB,
  port: ConfigEnv.PORT_DB,
  database: 'postgres',
  user: ConfigEnv.USER_DB,
  password: ConfigEnv.PASS_DB,
});

const clientSistema = new Pool({
  host: ConfigEnv.HOST_DB,
  port: ConfigEnv.PORT_DB,
  database: ConfigEnv.NAME_DB,
  user: ConfigEnv.USER_DB,
  password: ConfigEnv.PASS_DB,
});

const consulta = async (req, res, query, cliente) => {
  try {
    datos = await cliente.query(query);
    return datos.rows;
  } catch (err) {
    logger.error(err);
  }
};

const consultaPostgres = async (req, res, query) => {
  return consulta(req, res, query, clientPostgres);
};

const consultaSistema = async (req, res, query) => {
  return consulta(req, res, query, clientSistema);
};

const uri = `mongodb://${ConfigEnv.MONGO_USER}:${ConfigEnv.MONGO_PASS}@${ConfigEnv.MONGO_HOST}:${ConfigEnv.MONGO_PORT}/${ConfigEnv.MONGO_NAME}?authSource=admin`;

mongoose.connect(uri)
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar con MongoDB', err));

module.exports = {
  consultaPostgres,
  consultaSistema,
  mongoose
};
