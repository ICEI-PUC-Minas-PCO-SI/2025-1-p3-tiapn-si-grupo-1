'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('flow', 'post_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'postagem_comunidade',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('flow', 'post_id');
  }
};
