const {mongoose} = require('../../db/db');

async function obtenerTamanoMongoDB() {
  const db = mongoose.connection.db;
  const stats = await db.command({ dbStats: 1 });
  console.log("Tamaño de la Base de Datos (MongoDB):", stats.dataSize + stats.indexSize);
  return stats;
}

module.exports = {
  obtenerTamanoMongoDB
};
