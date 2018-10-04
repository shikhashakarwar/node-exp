'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quiz_questions', {
      qId: {
        type: Sequelize.STRING,
        primaryKey:true
      },
      text: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      categoy: {
        type: Sequelize.STRING
      },
      sub_category: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quiz_questions');
  }
};