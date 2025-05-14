'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comentario', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
      },
      mensagem: Sequelize.TEXT,
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      usuario_id: {
        type: Sequelize.UUID,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'CASCADE',
      },
      flow_id: {
        type: Sequelize.UUID,
        references: { model: 'flow', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('comentario');
  },
};
