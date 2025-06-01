const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Usuario = require("./usuario");
const PostagemComunidade = require("./postagemComunidade");

const ComentarioPostagem = sequelize.define(
  "ComentarioPostagem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    mensagem: {
      type: DataTypes.TEXT,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    postagem_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'comentario_postagem',
  }
);

ComentarioPostagem.belongsTo(Usuario, {foreignKey: 'usuario_id' });
ComentarioPostagem.belongsTo(PostagemComunidade, {foreignKey: 'postagem_id'});

module.exports = ComentarioPostagem;
