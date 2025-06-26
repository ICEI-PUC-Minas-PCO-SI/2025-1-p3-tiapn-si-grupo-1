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
      references: { model: "postagem_comunidade", key: "id" },
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "curtida",
    timestamps: false,
  }
);

module.exports = Curtida;
