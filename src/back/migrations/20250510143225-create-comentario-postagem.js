'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comentario_postagem', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      mensagem: Sequelize.TEXT,
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      postagem_id: {
        type: Sequelize.UUID,
        references: { model: 'postagem_comunidade', key: 'id' },
        onDelete: 'CASCADE',
      },
      usuario_id: {
        type: Sequelize.UUID,
        references: { model: 'usuario', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('comentario_postagem');
  },
};
