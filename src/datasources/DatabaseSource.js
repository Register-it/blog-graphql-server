const { DataSource } = require('apollo-datasource');

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
}

module.exports = DatabaseSource;