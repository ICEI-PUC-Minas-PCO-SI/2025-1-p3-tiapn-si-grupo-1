const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const Usuario = require("./usuario");
const Curtida = require("./curtida");
const PostagemComunidade = require("./postagemComunidade");

const Flow = sequelize.define(
  "flow",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    conteudo_nos: DataTypes.JSONB,
    conteudo_conexoes: DataTypes.JSONB,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    categoria: DataTypes.STRING,
    status: DataTypes.ENUM("rascunho"),
    criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: PostagemComunidade,
        key: "id",
      },
    },
    criado_por: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
  },
  { timestamps: false, tableName: "flow" }
);

Flow.belongsTo(Usuario, { foreignKey: "criado_por" });
Usuario.hasMany(Flow, { foreignKey: "criado_por" });

Flow.belongsTo(PostagemComunidade, { foreignKey: "post_id" });
PostagemComunidade.hasMany(Flow, { foreignKey: "post_id" });

Flow.hasMany(Curtida, { foreignKey: "flow_id" });

module.exports = Flow;
