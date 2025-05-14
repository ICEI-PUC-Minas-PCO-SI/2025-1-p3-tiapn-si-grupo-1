'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('postagem_comunidade', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      titulo: Sequelize.STRING,
      conteudo: Sequelize.TEXT,
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      criado_por: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('postagem_comunidade');
  },
};
