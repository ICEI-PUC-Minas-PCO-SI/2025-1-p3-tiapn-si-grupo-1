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

// Flow x Usuario
Usuario.hasMany(Flow, { foreignKey: "criado_por" });
Flow.belongsTo(Usuario, { foreignKey: "criado_por" });

// Comentario x Flow x Usuario
Usuario.hasMany(Comentario, { foreignKey: "usuario_id" });
Flow.hasMany(Comentario, { foreignKey: "flow_id" });
Comentario.belongsTo(Usuario, { foreignKey: "usuario_id" });
Comentario.belongsTo(Flow, { foreignKey: "flow_id" });

// Curtidas para Flow
Usuario.hasMany(Curtida, { foreignKey: "usuario_id", as: "curtidas" });
Flow.hasMany(Curtida, { foreignKey: "flow_id", as: "curtidas" });
Curtida.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Curtida.belongsTo(Flow, { foreignKey: "flow_id", as: "flow" });

// Curtidas para Postagens
PostagemComunidade.hasMany(Curtida, { foreignKey: "post_id", as: "curtidas" });
Curtida.belongsTo(PostagemComunidade, {
  foreignKey: "post_id",
  as: "postagem",
});

// FlowSalvo
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

// FlowSalvo também via belongsToMany (para busca simplificada)
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

// PostagemComunidade x Usuario
Usuario.hasMany(PostagemComunidade, { foreignKey: "criado_por" });
PostagemComunidade.belongsTo(Usuario, { foreignKey: "criado_por" });

// ComentarioPostagem
Usuario.hasMany(ComentarioPostagem, { foreignKey: "usuario_id" });
PostagemComunidade.hasMany(ComentarioPostagem, {
  foreignKey: "postagem_id",
});
ComentarioPostagem.belongsTo(Usuario, { foreignKey: "usuario_id" });
ComentarioPostagem.belongsTo(PostagemComunidade, {
  as: "postagem",
  foreignKey: "postagem_id",
});

// Se algum model tiver método associate, chama
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
