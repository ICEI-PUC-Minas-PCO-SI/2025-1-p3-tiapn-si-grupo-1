const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const PostagemComunidade = sequelize.define(
  "PostagemComunidade",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    conteudo: {
      type: DataTypes.TEXT,
    },
    categoria: {
  type: DataTypes.STRING,
  allowNull: true, // ou false, dependendo da regra
  validate: {
    len: [1, 100], // Exemplo de limite de tamanho
  },
},
    tipo: {
  type: DataTypes.ENUM("Discussão", "Solicitação", "Dúvida"),
  allowNull: true,
  comment: "1 = Discussão, 2 = Solicitação, 3 = Dúvida",
},
    tags: DataTypes.ARRAY(DataTypes.STRING),
    criado_por: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "postagem_comunidade",
    timestamps: false,
  }
);

module.exports = PostagemComunidade;
