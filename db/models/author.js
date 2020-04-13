'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    image: DataTypes.STRING,
    displayName: DataTypes.STRING
  }, {});
  author.associate = function(models) {
    // associations can be defined here
  };
  return author;
};