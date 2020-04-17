'use strict';
module.exports = (sequelize, DataTypes) => {
  const reaction = sequelize.define('reaction', {
    likes: DataTypes.INTEGER
  }, {});
  reaction.associate = function(models) {
    reaction.belongsTo(models.post);
  };
  return reaction;
};