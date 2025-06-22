const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

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
      allowNull: false,
    },
    postagem_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    comentario_pai_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "comentario_postagem",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

// Associações
ComentarioPostagem.associate = (models) => {
  ComentarioPostagem.belongsTo(models.Usuario, {
    as: "usuario",
    foreignKey: "usuario_id",
  });

  ComentarioPostagem.belongsTo(models.PostagemComunidade, {
    as: "postagem",
    foreignKey: "postagem_id",
  });

  ComentarioPostagem.belongsTo(models.ComentarioPostagem, {
    as: "comentarioPai",
    foreignKey: "comentario_pai_id",
  });

  ComentarioPostagem.hasMany(models.ComentarioPostagem, {
    as: "respostas",
    foreignKey: "comentario_pai_id",
  });
};

module.exports = ComentarioPostagem;
