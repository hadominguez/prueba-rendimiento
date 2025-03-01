const Posteo = require('../../models/mongo/Posteo');

exports.getPosteos = async (req, res) => {
    try {
        const posteos = await Posteo.find().populate('usuarioId');
        res.json(posteos);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los posteos', error: err });
    }
};

exports.getPosteoById = async (req, res) => {
    try {
        const posteo = await Posteo.findById(req.params.id).populate('usuarioId');
        if (posteo) {
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
        console.time("OperacionPosteosByUsuarioId_Mongo");
        const posteos = await Posteo.findByUsuarioId(req.params.usuarioId);
        console.timeEnd("OperacionPosteosByUsuarioId_Mongo");
        res.json(posteos);
    } catch (err) {
        res.status(500).send({ message: 'Error al obtener los posteos del usuario', error: err });
    }
};

exports.createPosteo = async (req, res) => {
    try {
        const nuevoPosteo = new Posteo(req.body);
        await nuevoPosteo.save();
        res.status(201).json(nuevoPosteo);
    } catch (err) {
        res.status(500).send({ message: 'Error al crear el posteo', error: err });
    }
};

exports.updatePosteo = async (req, res) => {
    try {
        const posteoActualizado = await Posteo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(posteoActualizado);
    } catch (err) {
        res.status(500).send({ message: 'Error al actualizar el posteo', error: err });
    }
};

exports.deletePosteo = async (req, res) => {
    try {
        const result = await Posteo.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: 'No se encontró el posteo con el ID proporcionado' });
        } else {
            res.send({ message: 'Posteo eliminado correctamente' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error al eliminar el posteo', error: err });
    }
};