'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flow', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
      },
      titulo: Sequelize.STRING,
      descricao: Sequelize.TEXT,
      conteudo_nos: Sequelize.JSONB,
      conteudo_conexoes: Sequelize.JSONB,
      tags: Sequelize.ARRAY(Sequelize.STRING),
      categoria: Sequelize.STRING,
      status: {
        type: Sequelize.ENUM('rascunho'),
        defaultValue: 'rascunho',
      },
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      criado_por: {
        type: Sequelize.UUID,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('flow');
  },
};
