'use strict';
module.exports = (sequelize, DataTypes) => {
  const quiz_questions = sequelize.define('quiz_questions', {
    qId: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    text: DataTypes.STRING,
    level: DataTypes.STRING,
    category: DataTypes.STRING,
    sub_category: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false
  });
  quiz_questions.associate = function(models) {
    models.quiz_questions.hasOne(models.que_choices, {forignKey: 'qId'});
    // associations can be defined here
  };
  return quiz_questions;
};