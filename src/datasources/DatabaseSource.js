const { DataSource } = require('apollo-datasource');
const { Op } = require('sequelize');

class DatabaseSource extends DataSource {
    constructor({ models }) {
        super();
        this.models = models;
    }

    async findAllPosts(include = []) {
        return await this.models.post.findAll({include: this._includedModels(include)});
    }

    async findById(id, include = []) {
        return await this.models.post.findByPk(id, {include: this._includedModels(include)});
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

    async findCommentsByPostIds(postIds) {
        const comments =  await this.models.comment.findAll({
            include: [
                {
                    model: this.models.post,
                    attributes: [ 'id' ]
                }, 
                this.models.author
            ]
        });

        return postIds.map(postId => 
            comments.filter(comment => comment.post.id == postId)
        );
    }

    async addLike(postId) {
        const reaction = await this.models.reaction.findOne({
            where: {
                postId: postId
            }
        });
        reaction.likes++;
        await reaction.save();
        return reaction.likes;
    }

    _includedModels(include) {
        return include.map(modelName => this.models[modelName]).filter(model => model);
    }
}

module.exports = DatabaseSource;