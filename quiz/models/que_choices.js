'use strict';
module.exports = (sequelize, DataTypes) => {
  const que_choices = sequelize.define('que_choices', {
    quiz_question_qId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    choice_1: DataTypes.STRING,
    choice_1_value: DataTypes.STRING,
    choice_2: DataTypes.STRING,
    choice_2_value: DataTypes.STRING,
    choice_3: DataTypes.STRING,
    choice_3_value: DataTypes.STRING,
    choice_4: DataTypes.STRING,
    choice_4_value: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false
  });
  que_choices.associate = function(models) {
    models.que_choices.belongsTo(models.quiz_questions, {forignKey: 'quiz_question_qId'});
    // associations can be defined here
  };
  return que_choices;
};