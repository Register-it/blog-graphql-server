'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    date: DataTypes.DATE,
    content: DataTypes.TEXT
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.post);
    comment.belongsTo(models.author);
  };
  return comment;
};