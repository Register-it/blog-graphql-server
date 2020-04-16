const graphqlFields = require('graphql-fields');

module.exports = function getIncludedObjects(graphqlInfo) {
    const fields = graphqlFields(graphqlInfo);
    return Object.keys(fields).filter(key => Object.keys(fields[key]).length);
};