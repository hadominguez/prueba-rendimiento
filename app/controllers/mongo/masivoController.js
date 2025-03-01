const Usuario = require('../../models/mongo/Usuario');
const Posteo = require('../../models/mongo/Posteo');
const base = require('../../models/mongo/base');

exports.masivoGenerar = async (req, res) => {
    const cantidad = parseInt(req.params.cantidad, 10);
    const usuarios = Math.ceil(cantidad / 10);

    try {
        console.time("OperacionGenerar_Mongo");
        for (let i = 0; i < usuarios; i++) {
            const usuario = new Usuario({
                nombre: `nombre${i}`,
                apellido: `apellido${i}`,
                nombreUsuario: `usuario${i}`,
                email: `email${i}@example.com`
            });
            await usuario.save();

            const postsPorUsuario = i < usuarios - 1 ? 10 : cantidad % 10 || 10;
            for (let j = 0; j < postsPorUsuario; j++) {
                const posteo = new Posteo({
                    contenido: `contenido del post ${j}`,
                    usuarioId: usuario._id
                });
                await posteo.save();
            }
        }
        console.timeEnd("OperacionGenerar_Mongo");
        await base.obtenerTamanoMongoDB();
        
        res.status(200).json({ message: 'Datos generados correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al generar los datos', error: err });
    }
};

exports.masivoModificar = async (req, res) => {
    const { likes, dislikes } = req.body;
    try {
        console.time("OperacionModificar_Mongo");
        await Posteo.updateMany({}, { $set: { likes: likes, dislikes: dislikes } });
        console.timeEnd("OperacionModificar_Mongo");
        await base.obtenerTamanoMongoDB();
        
        res.status(200).json({ message: 'Posteos modificados correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al modificar los posteos', error: err });
    }
};

exports.masivoBorrar = async (req, res) => {
    try {
        console.time("OperacionBorrar_Mongo");
        await Posteo.deleteMany({});
        await Usuario.deleteMany({});
        console.timeEnd("OperacionBorrar_Mongo");
        await base.obtenerTamanoMongoDB();

        res.status(200).json({ message: 'Base de datos limpiada correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al limpiar la base de datos', error: err });
    }
};