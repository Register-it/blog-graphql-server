require('core-js');
const getIncludedObjects = require('@src/utils/getIncludedObjects');

jest.mock('graphql-fields', () => (info) => info.fieldNodes);

it('will return an empty array if the query does not contain any subobjects', () => {
  const info = {
    fieldNodes: {
      field1: {},
      field2: {},
      field3: {},
    },
  };
  const result = getIncludedObjects(info);
  expect(result).toEqual([]);
});

it('will return the list of the subobjects included in the query', () => {
  const info = {
    fieldNodes: {
      field1: {},
      field2: {},
      subObject1: { subfield1: {} },
      field3: {},
      subObject2: { subfield2: {} },
    },
  };
  const result = getIncludedObjects(info);
  expect(result).toEqual(['subObject1', 'subObject2']);
});

it('will return also the nested subobjects in the query', () => {
  const info = {
    fieldNodes: {
      field1: {},
      field2: {},
      subObject1: { subSubObject1: { subfield1: {} } },
      field3: {},
      subObject2: { subfield2: {} },
    },
  };
  const result = getIncludedObjects(info);
  expect(result).toEqual(['subSubObject1', 'subObject1', 'subObject2']);
});
