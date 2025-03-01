const db = require("../../db/db");

const getPosteos = async () => {
  const query = {
    text: `SELECT * FROM sistema.posteos;`,
    values: []
  };
  return await db.consultaSistema(null, null, query);
};

const getPosteoById = async (posteoId) => {
  const query = {
    text: `SELECT p.*, u.nombre, u.apellido, u.nombre_usuario 
           FROM sistema.posteos p 
           JOIN sistema.usuarios u ON p.usuario_id = u.id 
           WHERE p.id = $1;`,
    values: [posteoId]
  };
  return await db.consultaSistema(null, null, query);
};

const getPosteosByUsuarioId = async (usuarioId) => {
  const query = {
    text: `SELECT p.*, u.nombre, u.apellido, u.nombre_usuario 
           FROM sistema.posteos p 
           JOIN sistema.usuarios u ON p.usuario_id = u.id 
           WHERE p.usuario_id = $1;`,
    values: [usuarioId]
  };
  return await db.consultaSistema(null, null, query);
};

const createPosteo = async (posteo) => {
  const query = {
    text: `INSERT INTO sistema.posteos(contenido, likes, dislikes, reposts, fecha_hora, usuario_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
    values: [posteo.contenido, posteo.likes, posteo.dislikes, posteo.reposts, posteo.fecha_hora, posteo.usuario_id]
  };
  return await db.consultaSistema(null, null, query);
};

const updatePosteo = async (posteoId, posteo) => {
  const query = {
    text: `UPDATE sistema.posteos SET contenido = $1, likes = $2, dislikes = $3, reposts = $4 WHERE id = $5 RETURNING *;`,
    values: [posteo.contenido, posteo.likes, posteo.dislikes, posteo.reposts, posteoId]
  };
  return await db.consultaSistema(null, null, query);
};

const deletePosteo = async (posteoId) => {
  const query = {
    text: `DELETE FROM sistema.posteos WHERE id = $1;`,
    values: [posteoId]
  };
  return await db.consultaSistema(null, null, query);
};

module.exports = {
  getPosteos,
  getPosteoById,
  getPosteosByUsuarioId,
  createPosteo,
  updatePosteo,
  deletePosteo
};
