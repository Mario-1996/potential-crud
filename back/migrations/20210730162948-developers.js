'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('developers', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING(1)
      },
      idade: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      datanascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY,  
      },
      hobby: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('developers');
  }
};
