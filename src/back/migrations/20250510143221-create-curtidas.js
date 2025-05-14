'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('curtida', {
      usuario_id: {
        type: Sequelize.UUID,
        references: { model: 'usuario', key: 'id' },
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      flow_id: {
        type: Sequelize.UUID,
        references: { model: 'flow', key: 'id' },
        primaryKey: true,
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('curtida');
  },
};
