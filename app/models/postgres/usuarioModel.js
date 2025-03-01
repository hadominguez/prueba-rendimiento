const db = require("../../db/db");

const getUsuarios = async () => {
  const query = {
    text: `SELECT * FROM sistema.usuarios;`,
    values: []
  };
  return await db.consultaSistema(null, null, query);
};

const getUsuarioById = async (usuarioId) => {
  const query = {
    text: `SELECT * FROM sistema.usuarios WHERE id = $1;`,
    values: [usuarioId]
  };
  return await db.consultaSistema(null, null, query);
};

const createUsuario = async (usuario) => {
  const query = {
    text: `INSERT INTO sistema.usuarios(nombre, apellido, nombre_usuario, email, fecha_alta) VALUES($1, $2, $3, $4, $5) RETURNING *;`,
    values: [usuario.nombre, usuario.apellido, usuario.nombre_usuario, usuario.email, usuario.fecha_alta]
  };
  return await db.consultaSistema(null, null, query);
};

const updateUsuario = async (usuarioId, usuario) => {
  const query = {
    text: `UPDATE sistema.usuarios SET nombre = $1, apellido = $2, nombre_usuario = $3, email = $4 WHERE id = $5 RETURNING *;`,
    values: [usuario.nombre, usuario.apellido, usuario.nombre_usuario, usuario.email, usuarioId]
  };
  return await db.consultaSistema(null, null, query);
};

const deleteUsuario = async (usuarioId) => {
  const query = {
    text: `DELETE FROM sistema.usuarios WHERE id = $1;`,
    values: [usuarioId]
  };
  return await db.consultaSistema(null, null, query);
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
