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

    async findTagsByPostIds(postIds) {
        const tags =  await this.models.tag.findAll({
            include: [{
                model: this.models.post,
                attributes: [ 'id' ],
                required: true,
                through: {
                    where: {
                        postId: {
                            [Op.in]: postIds
                        }
                    }
                }
            }]
        });

        return postIds.map(postId => 
            tags.filter(tag => tag.posts.find(post => post.id == postId)).map(tag => tag.name)
        );
    }

    async findLikesByPostIds(postIds) {
        const reactions =  await this.models.reaction.findAll({
            include: [{
                model: this.models.post,
                attributes: [ 'id' ]
            }]
        });

        return postIds.map(postId => 
            reactions.find(reaction => reaction.post.id == postId).likes
        );
    }
}

module.exports = DatabaseSource;