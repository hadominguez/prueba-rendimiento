const usuarioModel = require('../../models/postgres/usuarioModel');
const logger = require("../../utils/logger");

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.getUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los usuarios', error: err });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await usuarioModel.getUsuarioById(req.params.id);
        if (usuario.length) {
            res.json(usuario);
        } else {
            res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener el usuario', error: err });
    }
};

exports.createUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuarioModel.createUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).send({ message: 'Error al crear el usuario', error: err });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await usuarioModel.updateUsuario(req.params.id, req.body);
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar el usuario', error: err });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        await usuarioModel.deleteUsuario(req.params.id);
        res.send({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al eliminar el usuario', error: err });
    }
};
