const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/postgres/usuarioController');
const posteoController = require('../controllers/postgres/posteoController');
const masivoController = require('../controllers/postgres/masivoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - nombre_usuario
 *         - email
 *         - fecha_alta
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental del usuario
 *         nombre:
 *           type: string
 *           description: El nombre del usuario
 *         apellido:
 *           type: string
 *           description: El apellido del usuario
 *         nombre_usuario:
 *           type: string
 *           description: El nombre de usuario único
 *         email:
 *           type: string
 *           description: El correo electrónico del usuario
 *         fecha_alta:
 *           type: string
 *           format: date-time
 *           description: La fecha de alta del usuario
 *     Posteo:
 *       type: object
 *       required:
 *         - contenido
 *         - usuario_id
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autoincremental del posteo
 *         contenido:
 *           type: string
 *           description: El contenido del posteo
 *         likes:
 *           type: integer
 *           description: Conteo de likes del posteo
 *         dislikes:
 *           type: integer
 *           description: Conteo de dislikes del posteo
 *         reposts:
 *           type: integer
 *           description: Conteo de reposts del posteo
 *         fecha_hora:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora del posteo
 *         usuario_id:
 *           type: integer
 *           description: El ID del usuario que creó el posteo
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones sobre usuarios en PostgreSQL
 */

/**
 * @swagger
 * /api/postgres/usuario:
 *   get:
 *     summary: Retorna todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/postgres/usuario', usuarioController.getUsuarios);

/**
 * @swagger
 * /api/postgres/usuario/{id}:
 *   get:
 *     summary: Retorna un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/postgres/usuario/:id', usuarioController.getUsuarioById);

/**
 * @swagger
 * /api/postgres/usuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       500:
 *         description: Error al crear el usuario
 */
router.post('/postgres/usuario', usuarioController.createUsuario);

/**
 * @swagger
 * /api/postgres/usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put('/postgres/usuario', usuarioController.updateUsuario);

/**
 * @swagger
 * /api/postgres/usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/postgres/usuario/:id', usuarioController.deleteUsuario);

/**
 * @swagger
 * /api/postgres/posteo:
 *   get:
 *     summary: Retorna todos los posteos
 *     tags: [Posteos]
 *     responses:
 *       200:
 *         description: Lista de todos los posteos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posteo'
 */
router.get('/postgres/posteo', posteoController.getPosteos);

/**
 * @swagger
 * /api/postgres/usuario/{usuarioId}/posteo:
 *   get:
 *     summary: Obtiene todos los posteos de un usuario específico
 *     tags: [Posteos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de posteos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posteo'
 *       404:
 *         description: No se encontraron posteos para el usuario
 */
router.get('/postgres/usuario/:usuarioId/posteo', posteoController.getPosteosByUsuarioId);

/**
 * @swagger
 * /api/postgres/usuario/{usuarioId}/posteo:
 *   post:
 *     summary: Crea un nuevo posteo para un usuario específico
 *     tags: [Posteos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posteo'
 *     responses:
 *       201:
 *         description: Posteo creado correctamente
 *       500:
 *         description: Error al crear el posteo
 */
router.post('/postgres/usuario/:usuarioId/posteo', posteoController.createPosteo);

/**
 * @swagger
 * /api/postgres/posteo/{id}:
 *   put:
 *     summary: Actualiza un posteo específico
 *     tags: [Posteos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del posteo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posteo'
 *     responses:
 *       200:
 *         description: Posteo actualizado correctamente
 *       404:
 *         description: Posteo no encontrado
 *       500:
 *         description: Error al actualizar el posteo
 */
router.put('/postgres/posteo/:id', posteoController.updatePosteo);

/**
 * @swagger
 * /api/postgres/posteo/{id}:
 *   delete:
 *     summary: Elimina un posteo específico
 *     tags: [Posteos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del posteo a eliminar
 *     responses:
 *       200:
 *         description: Posteo eliminado correctamente
 *       404:
 *         description: Posteo no encontrado
 *       500:
 *         description: Error al eliminar el posteo
 */
router.delete('/postgres/posteo/:id', posteoController.deletePosteo);


/**
 * @swagger
 * /api/postgres/masivo/generar/{cantidad}:
 *   post:
 *     summary: Genera usuarios y posteos masivamente en PostgreSQL
 *     tags: [PostgreSQL Masivo]
 *     parameters:
 *       - in: path
 *         name: cantidad
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cantidad total de posteos a generar.
 *     responses:
 *       200:
 *         description: Datos generados correctamente.
 *       500:
 *         description: Error al generar los datos.
 */
router.post('/postgres/masivo/generar/:cantidad', masivoController.masivoGenerar);

/**
 * @swagger
 * /api/postgres/masivo/modificar:
 *   put:
 *     summary: Modifica todos los posteos en PostgreSQL
 *     tags: [PostgreSQL Masivo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               likes:
 *                 type: integer
 *                 description: Nueva cantidad de likes para cada posteo
 *               dislikes:
 *                 type: integer
 *                 description: Nueva cantidad de dislikes para cada posteo
 *     responses:
 *       200:
 *         description: Posteos modificados correctamente.
 *       500:
 *         description: Error al modificar los posteos.
 */
router.put('/postgres/masivo/modificar', masivoController.masivoModificar);

/**
 * @swagger
 * /api/postgres/masivo/borrar:
 *   delete:
 *     summary: Borra todos los usuarios y posteos en PostgreSQL
 *     tags: [PostgreSQL Masivo]
 *     responses:
 *       200:
 *         description: Base de datos limpiada correctamente.
 *       500:
 *         description: Error al limpiar la base de datos.
 */
router.delete('/postgres/masivo/borrar', masivoController.masivoBorrar);


module.exports = router;
