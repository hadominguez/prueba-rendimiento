const Usuario = require('../../models/mongo/Usuario');

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los usuarios', error: err });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario) {
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
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(500).send({ message: 'Error al crear el usuario', error: err });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuarioActualizado);
    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar el usuario', error: err });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
        const result = await Usuario.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: 'No se encontró el usuario con el ID proporcionado' });
        } else {
            res.send({ message: 'Usuario eliminado correctamente' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al eliminar el usuario', error: err });
    }
};
