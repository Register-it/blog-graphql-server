const { DataSource } = require('apollo-datasource');
const { Op } = require('sequelize');

class DatabaseSource extends DataSource {
    constructor({ models }) {
        super();
        this.models = models;
    }

    async findAllPosts(include = []) {
        include = include.map(modelName => this.models[modelName]);
        return await this.models.post.findAll({include});
    }

    async findById(id, include = []) {
        include = include.map(modelName => this.models[modelName]);
        return await this.models.post.findByPk(id, {include});
    }

    async findTagsByPostId(postId) {
        const tags =  await this.models.tag.findAll({
            include: [{
                model: this.models.post,
                required: true,
                through: {
                    where: {
                        postId: {
                            [Op.eq]: postId
                        }
                    }
                }
            }]
        });

        return tags.map(tag => tag.name);
    }

    async findLikesByPostId(postId) {
        const reaction =  await this.models.reaction.findOne({
            include: [ this.models.post ],
            where: {
                '$post.id$': postId
            }
        });

        return reaction.likes;
    }
}

module.exports = DatabaseSource;