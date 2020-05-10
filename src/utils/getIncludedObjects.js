const graphqlFields = require('graphql-fields');

function findSubobjects(name, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) {
    return [];
  }

  const result = keys.map((key) => findSubobjects(key, fields[key])).flat();
  if (name) {
    result.push(name);
  }

  return result;
}

module.exports = function getIncludedObjects(graphqlInfo) {
  const fields = graphqlFields(graphqlInfo);
  return findSubobjects(null, fields);
};
