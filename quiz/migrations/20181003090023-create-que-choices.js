'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('que_choices', {
      choice_1: {
        type: Sequelize.STRING
      },
      choice_1_value: {
        type: Sequelize.STRING
      },
      choice_2: {
        type: Sequelize.STRING
      },
      choice_2_value: {
        type: Sequelize.STRING
      },
      choice_3: {
        type: Sequelize.STRING
      },
      choice_3_value: {
        type: Sequelize.STRING
      },
      choice_4: {
        type: Sequelize.STRING
      },
      choice_4_value: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('que_choices');
  }
};