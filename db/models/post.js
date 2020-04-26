'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    date: DataTypes.DATE,
    readingTime: DataTypes.INTEGER,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  post.associate = function(models) {
    post.belongsTo(models.author);
    post.belongsToMany(models.tag, { through: 'postTags' });
  };
  return post;
};