const posteoModel = require('../../models/postgres/posteoModel');

exports.getPosteos = async (req, res) => {
    try {
        const posteos = await posteoModel.getPosteos();
        res.json(posteos);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los posteos', error: err });
    }
};

exports.getPosteoById = async (req, res) => {
    try {
        const posteo = await posteoModel.getPosteoById(req.params.id);
        if (posteo.length) {
            res.json(posteo);
        } else {
            res.status(404).send({ message: 'Posteo no encontrado' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener el posteo', error: err });
    }
};

exports.getPosteosByUsuarioId = async (req, res) => {
    try {
        console.time("OperacionPosteosByUsuarioId_Postgres");
        const posteos = await posteoModel.getPosteosByUsuarioId(req.params.usuarioId);
        console.timeEnd("OperacionPosteosByUsuarioId_Postgres");
        res.json(posteos);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los posteos del usuario', error: err });
    }
};

exports.createPosteo = async (req, res) => {
    try {
        const nuevoPosteo = await posteoModel.createPosteo(req.body);
        res.status(201).json(nuevoPosteo);
    } catch (err) {
        res.status(500).send({ message: 'Error al crear el posteo', error: err });
    }
};

exports.updatePosteo = async (req, res) => {
    try {
        const posteoActualizado = await posteoModel.updatePosteo(req.params.id, req.body);
        res.json(posteoActualizado);
    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar el posteo', error: err });
    }
};

exports.deletePosteo = async (req, res) => {
    try {
        await posteoModel.deletePosteo(req.params.id);
        res.send({ message: 'Posteo eliminado correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al eliminar el posteo', error: err });
    }
};
