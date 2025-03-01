const db = require("../../db/db");
const base = require('../../models/postgres/base');

exports.masivoGenerar = async (req, res) => {
    const cantidad = parseInt(req.params.cantidad, 10);
    const usuarios = Math.ceil(cantidad / 10);

    try {
        console.time("OperacionGenerar_Postgres");
        for (let i = 0; i < usuarios; i++) {
            const query = {
                text: `INSERT INTO sistema.usuarios(nombre, apellido, nombre_usuario, email) VALUES('nombre${i}', 'apellido${i}', 'usuario${i}', 'email${i}@example.com') RETURNING id;`,
                values: []
            };
            const rows = await db.consultaSistema(req, res, query);
            const usuarioId = rows[0].id;
            const postsPorUsuario = i < usuarios - 1 ? 10 : cantidad % 10 || 10;

            for (let j = 0; j < postsPorUsuario; j++) {
                await db.consultaSistema(req, res,
                    `INSERT INTO sistema.posteos(contenido, usuario_id) VALUES('contenido del post ${j}', ${usuarioId});`
                );
            }
        }
        console.timeEnd("OperacionGenerar_Postgres");
        await base.obtenerTamanoPostgreSQL();

        res.status(200).json({ message: 'Datos generados correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al generar los datos', error: err });
    }
};

exports.masivoModificar = async (req, res) => {
    const { likes, dislikes } = req.body;
    try {
        console.time("OperacionModificar_Postgres");
        let query = {
            text: `UPDATE sistema.posteos SET likes = $1, dislikes = $2;`,
            values: [likes, dislikes]
        };
        await db.consultaSistema(req, res, query);
        console.timeEnd("OperacionModificar_Postgres");
        await base.obtenerTamanoPostgreSQL();

        res.status(200).json({ message: 'Posteos modificados correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al modificar los posteos', error: err });
    }
};

exports.masivoBorrar = async (req, res) => {
    try {
        console.time("OperacionBorrar_Postgres");
        let query = {
            text: `DELETE FROM sistema.posteos;`,
            values: []
        };
        await db.consultaSistema(null, null, query);
        query = {
            text: `DELETE FROM sistema.usuarios;`,
            values: []
        };
        await db.consultaSistema(null, null, query);
        console.timeEnd("OperacionBorrar_Postgres");
        await base.obtenerTamanoPostgreSQL();

        res.status(200).json({ message: 'Base de datos limpiada correctamente' });
    } catch (err) {
        res.status(500).send({ message: 'Error al limpiar la base de datos', error: err });
    }
};
