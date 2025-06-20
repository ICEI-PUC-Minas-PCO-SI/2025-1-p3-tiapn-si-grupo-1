const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const PostagemComunidade = require("./postagemComunidade");
const Flow = require("./flow");
const Usuario = require("./usuario");

const Curtida = sequelize.define(
  "curtida",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "usuario", key: "id" },
    },
    flow_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "flow", key: "id" },
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {model: "postagem_comunidade", key: "id"},
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "curtida",
    timestamps: false,
  });

Curtida.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Curtida.belongsTo(Flow, { foreignKey: "flow_id", as: "flow" });
Curtida.belongsTo(PostagemComunidade, { foreignKey: "post_id", as: "postagem" });

Usuario.hasMany(Curtida, { foreignKey: "usuario_id", as: "curtidas" });
Flow.hasMany(Curtida, { foreignKey: "flow_id", as: "curtidas" });
PostagemComunidade.hasMany(Curtida, { foreignKey: "post_id", as: "curtidas" });

module.exports = Curtida;
