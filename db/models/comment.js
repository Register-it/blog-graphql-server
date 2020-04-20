'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    date: DataTypes.DATEONLY,
    content: DataTypes.TEXT
  }, {});
  comment.associate = function(models) {
    comment.belongsTo(models.post);
    comment.belongsTo(models.author);
  };
  return comment;
};