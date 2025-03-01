const {mongoose} = require('../../db/db');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  nombreUsuario: String,
  email: String,
  fechaAlta: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
