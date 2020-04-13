const { DataSource } = require('apollo-datasource');

class DatabaseSource extends DataSource {
    constructor({ models }) {
        super();
        this.models = models;
    }

    async findAllPosts() {
        return await this.models.post.findAll({include: [ this.models.author ]});
    }

    async findById(id) {
        return await this.models.post.findByPk(id, {include: [ this.models.author ]});
    }
}

module.exports = DatabaseSource;