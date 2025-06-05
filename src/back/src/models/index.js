const sequelize = require('../../db'); 
const Usuario = require('./usuario');
const Flow = require('./flow');
const Comentario = require('./comentario');
const Curtida = require('./curtida');
const FlowSalvo = require('./flowsalvo');
const PostagemComunidade = require('./postagemComunidade');
const ComentarioPostagem = require('./comentarioPostagem');

// Relacionamentos
Usuario.hasMany(Flow, { foreignKey: 'criado_por' });
Flow.belongsTo(Usuario, { foreignKey: 'criado_por' });

Usuario.hasMany(Comentario, { foreignKey: 'usuario_id' });
Flow.hasMany(Comentario, { foreignKey: 'flow_id' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Comentario.belongsTo(Flow, { foreignKey: 'flow_id' });

Usuario.belongsToMany(Flow, { through: Curtida, as: 'flowsCurtidos', foreignKey: 'usuario_id' });
Flow.belongsToMany(Usuario, { through: Curtida, as: 'curtidoPor', foreignKey: 'flow_id' });

Usuario.belongsToMany(Flow, { through: FlowSalvo, as: 'flowsSalvos', foreignKey: 'usuario_id' });
Flow.belongsToMany(Usuario, { through: FlowSalvo, as: 'salvoPor', foreignKey: 'flow_id' });

Usuario.hasMany(PostagemComunidade, { foreignKey: 'criado_por' });
PostagemComunidade.belongsTo(Usuario, { foreignKey: 'criado_por' });

Usuario.hasMany(ComentarioPostagem, { foreignKey: 'usuario_id' });
PostagemComunidade.hasMany(ComentarioPostagem, { foreignKey: 'postagem_id' });
ComentarioPostagem.belongsTo(Usuario, { foreignKey: 'usuario_id' });
ComentarioPostagem.belongsTo(PostagemComunidade, { as: "PostagemComunidade", foreignKey: 'postagem_id' });


Usuario.hasMany(FlowSalvo, {foreignKey: 'usuario_id', as: 'registrosFlowSalvo'});

// Object.values(db).forEach(model => {
//   if (model.associate) {
//     model.associate(db);
//   }
// });

module.exports = {
  sequelize,
  Usuario,
  Flow,
  Comentario,
  Curtida,
  FlowSalvo,
  PostagemComunidade,
  ComentarioPostagem
};
