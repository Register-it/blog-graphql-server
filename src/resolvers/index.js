const { merge } = require('lodash');
const postResolver = require('./post');
const commentResolver = require('./comment');
const tagResolver = require('./tag');
const likeResolver = require('./like');

module.exports = merge({}, postResolver, commentResolver, tagResolver, likeResolver);
