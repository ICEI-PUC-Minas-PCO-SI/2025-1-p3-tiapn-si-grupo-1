'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop tabela antiga se for o caso
    await queryInterface.dropTable('curtida');

    // Criar nova estrutura
    await queryInterface.createTable('curtida', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      usuario_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'CASCADE',
      },
      flow_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'flow', key: 'id' },
        onDelete: 'CASCADE',
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'postagem_comunidade', key: 'id' },
        onDelete: 'CASCADE',
      },
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('curtida');
  },
};
