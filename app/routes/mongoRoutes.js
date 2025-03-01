const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/mongo/usuarioController');
const posteoController = require('../controllers/mongo/posteoController');
const masivoController = require('../controllers/mongo/masivoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioMongo:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - nombre_usuario
 *         - email
 *         - fechaAlta
 *       properties:
 *         id:
 *           type: string
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
 *         fechaAlta:
 *           type: string
 *           format: date-time
 *           description: La fecha de alta del usuario
 *     PosteoMongo:
 *       type: object
 *       required:
 *         - contenido
 *         - usuarioId
 *       properties:
 *         id:
 *           type: string
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
 *         fechaHora:
 *           type: string
 *           format: date-time
 *           description: La fecha y hora del posteo
 *         usuarioId:
 *           type: integer
 *           description: El ID del usuario que creó el posteo
 */

/**
 * @swagger
 * tags:
 *   name: UsuariosMongo
 *   description: Operaciones sobre usuarios en mongo
 */

/**
 * @swagger
 * /api/mongo/usuario:
 *   get:
 *     summary: Retorna todos los usuarios
 *     tags: [UsuariosMongo]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioMongo'
 */
router.get('/mongo/usuario', usuarioController.getUsuarios);

/**
 * @swagger
 * /api/mongo/usuario/{id}:
 *   get:
 *     summary: Retorna un usuario por su ID
 *     tags: [UsuariosMongo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioMongo'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/mongo/usuario/:id', usuarioController.getUsuarioById);

/**
 * @swagger
 * /api/mongo/usuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [UsuariosMongo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioMongo'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       500:
 *         description: Error al crear el usuario
 */
router.post('/mongo/usuario', usuarioController.createUsuario);

/**
 * @swagger
 * /api/mongo/usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [UsuariosMongo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioMongo'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put('/mongo/usuario/:id', usuarioController.updateUsuario);

/**
 * @swagger
 * /api/mongo/usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [UsuariosMongo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
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
router.delete('/mongo/usuario/:id', usuarioController.deleteUsuario);

/**
 * @swagger
 * /api/mongo/posteo:
 *   get:
 *     summary: Retorna todos los posteos
 *     tags: [PosteosMongo]
 *     responses:
 *       200:
 *         description: Lista de todos los posteos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PosteoMongo'
 */
router.get('/mongo/posteo', posteoController.getPosteos);

/**
 * @swagger
 * /api/mongo/usuario/{usuarioId}/posteo:
 *   get:
 *     summary: Obtiene todos los posteos de un usuario específico
 *     tags: [PosteosMongo]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de posteos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PosteoMongo'
 *       404:
 *         description: No se encontraron posteos para el usuario
 */
router.get('/mongo/usuario/:usuarioId/posteo', posteoController.getPosteosByUsuarioId);

/**
 * @swagger
 * /api/mongo/usuario/{usuarioId}/posteo:
 *   post:
 *     summary: Crea un nuevo posteo para un usuario específico
 *     tags: [PosteosMongo]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PosteoMongo'
 *     responses:
 *       201:
 *         description: Posteo creado correctamente
 *       500:
 *         description: Error al crear el posteo
 */
router.post('/mongo/usuario/:usuarioId/posteo', posteoController.createPosteo);

/**
 * @swagger
 * /api/mongo/posteo/{id}:
 *   put:
 *     summary: Actualiza un posteo específico
 *     tags: [PosteosMongo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del posteo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PosteoMongo'
 *     responses:
 *       200:
 *         description: Posteo actualizado correctamente
 *       404:
 *         description: Posteo no encontrado
 *       500:
 *         description: Error al actualizar el posteo
 */
router.put('/mongo/posteo/:id', posteoController.updatePosteo);

/**
 * @swagger
 * /api/mongo/posteo/{id}:
 *   delete:
 *     summary: Elimina un posteo específico
 *     tags: [PosteosMongo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del posteo a eliminar
 *     responses:
 *       200:
 *         description: Posteo eliminado correctamente
 *       404:
 *         description: Posteo no encontrado
 *       500:
 *         description: Error al eliminar el posteo
 */
router.delete('/mongo/posteo/:id', posteoController.deletePosteo);


/**
 * @swagger
 * /api/mongo/masivo/generar/{cantidad}:
 *   post:
 *     summary: Genera usuarios y posteos masivamente en MongoDB
 *     tags: [MongoDB Masivo]
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
router.post('/mongo/masivo/generar/:cantidad', masivoController.masivoGenerar);

/**
 * @swagger
 * /api/mongo/masivo/modificar:
 *   put:
 *     summary: Modifica todos los posteos en MongoDB
 *     tags: [MongoDB Masivo]
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
router.put('/mongo/masivo/modificar', masivoController.masivoModificar);

/**
 * @swagger
 * /api/mongo/masivo/borrar:
 *   delete:
 *     summary: Borra todos los usuarios y posteos en MongoDB
 *     tags: [MongoDB Masivo]
 *     responses:
 *       200:
 *         description: Base de datos limpiada correctamente.
 *       500:
 *         description: Error al limpiar la base de datos.
 */
router.delete('/mongo/masivo/borrar', masivoController.masivoBorrar);


module.exports = router;
