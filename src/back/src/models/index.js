const sequelize = require("../../db");
const Usuario = require("./usuario");
const Flow = require("./flow");
const Comentario = require("./comentario");
const Curtida = require("./curtida");
const FlowSalvo = require("./flowsalvo");
const PostagemComunidade = require("./postagemComunidade");
const ComentarioPostagem = require("./comentarioPostagem");

const models = {
  Usuario,
  Flow,
  Comentario,
  Curtida,
  FlowSalvo,
  PostagemComunidade,
  ComentarioPostagem,
};

Usuario.hasMany(Flow, { foreignKey: "criado_por" });
Flow.belongsTo(Usuario, { foreignKey: "criado_por" });

Usuario.hasMany(Comentario, { foreignKey: "usuario_id" });
Flow.hasMany(Comentario, { foreignKey: "flow_id" });
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });
Comentario.belongsTo(Flow, { foreignKey: "flow_id" });

Usuario.hasMany(Curtida, { foreignKey: "usuario_id", as: "curtidas" });
Flow.hasMany(Curtida, { foreignKey: "flow_id", as: "curtidas" });
Curtida.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Curtida.belongsTo(Flow, { foreignKey: "flow_id", as: "flow" });

PostagemComunidade.hasMany(Curtida, { foreignKey: "post_id", as: "curtidas" });
Curtida.belongsTo(PostagemComunidade, {
  foreignKey: "post_id",
  as: "postagem",
});

Usuario.hasMany(FlowSalvo, {
  foreignKey: "usuario_id",
  as: "registrosFlowSalvo",
});
Flow.hasMany(FlowSalvo, {
  foreignKey: "flow_id",
  as: "registrosFlowSalvo",
});
FlowSalvo.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
FlowSalvo.belongsTo(Flow, { foreignKey: "flow_id", as: "flow" });

Usuario.belongsToMany(Flow, {
  through: FlowSalvo,
  as: "flowsSalvos",
  foreignKey: "usuario_id",
});
Flow.belongsToMany(Usuario, {
  through: FlowSalvo,
  as: "salvoPor",
  foreignKey: "flow_id",
});

Usuario.hasMany(PostagemComunidade, { foreignKey: "criado_por" });
PostagemComunidade.belongsTo(Usuario, { foreignKey: "criado_por", as: "criador" });

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
