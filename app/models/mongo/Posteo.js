const {mongoose} = require('../../db/db');

const posteoSchema = new mongoose.Schema({
  contenido: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  reposts: { type: Number, default: 0 },
  fechaHora: { type: Date, default: Date.now },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

posteoSchema.statics.findByUsuarioId = function (usuarioId) {
  return this.find({ usuarioId }).populate('usuarioId', 'nombre apellido nombreUsuario');
};

posteoSchema.statics.findPosteoByUsuarioId = function (usuarioId, posteoId) {
  return this.findOne({ _id: posteoId, usuarioId: usuarioId }).populate('usuarioId', 'nombre apellido nombreUsuario');
};

const Posteo = mongoose.model('Posteo', posteoSchema);

module.exports = Posteo;
