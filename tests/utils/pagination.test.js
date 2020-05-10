require('core-js');
const { paginateByDateAndId } = require('@src/utils/pagination');

const dataSource = {
  emptySource: () => [],
  queryMethod: (arg, first, after) => arg.filter((x) => x.date < after.date).slice(0, first),
};

function decodeCursor(cursor) {
  return JSON.parse(Buffer.from(cursor, 'base64').toString());
}

function getTestItems() {
  return [
    {
      id: '567',
      date: 1234567890567,
    },
    {
      id: '456',
      date: 1234567890456,
    },
    {
      id: '345',
      date: 1234567890345,
    },
    {
      id: '234',
      date: 1234567890234,
    },
    {
      id: '123',
      date: 1234567890123,
    },
  ];
}

it('returns an empty array if dataSource is empty and first and after are not given', async () => {
  const result = await paginateByDateAndId({
    dataSource,
    method: 'emptySource',
  });

  expect(result.nodes.length).toBe(0);
  expect(result.hasMore).toBeFalsy();

  const cursor = decodeCursor(result.cursor);
  expect(cursor.date).toBe(0);
  expect(cursor.id).toBe(0);
});

it('returns an empty array with hasMore if dataSource is not empty but first and after are not given', async () => {
  const result = await paginateByDateAndId({
    dataSource,
    method: 'queryMethod',
    args: [getTestItems()],
  });

  expect(result.nodes.length).toBe(0);
  expect(result.hasMore).toBeTruthy();

  const cursor = decodeCursor(result.cursor);
  expect(cursor.date).toBe(0);
  expect(cursor.id).toBe(0);
});

it('returns the first required elements', async () => {
  const result = await paginateByDateAndId({
    dataSource,
    method: 'queryMethod',
    args: [getTestItems()],
    first: 2,
  });

  expect(result.nodes.length).toBe(2);
  expect(result.hasMore).toBeTruthy();

  const cursor = decodeCursor(result.cursor);
  expect(cursor.date).toBe(1234567890456);
  expect(cursor.id).toBe('456');
});

it('returns the first required elements starting after the given cursor', async () => {
  const result = await paginateByDateAndId({
    dataSource,
    method: 'queryMethod',
    args: [getTestItems()],
    first: 2,
    after: 'eyJkYXRlIjoxMjM0NTY3ODkwNDU2LCJpZCI6IjQ1NiJ9',
  });

  expect(result.nodes.length).toBe(2);
  expect(result.hasMore).toBeTruthy();

  const cursor = decodeCursor(result.cursor);
  expect(cursor.date).toBe(1234567890234);
  expect(cursor.id).toBe('234');
});

it('returns all the remaining elements if it\'s the last page', async () => {
  const result = await paginateByDateAndId({
    dataSource,
    method: 'queryMethod',
    args: [getTestItems()],
    first: 4,
    after: 'eyJkYXRlIjoxMjM0NTY3ODkwNDU2LCJpZCI6IjQ1NiJ9',
  });

  expect(result.nodes.length).toBe(3);
  expect(result.hasMore).toBeFalsy();

  const cursor = decodeCursor(result.cursor);
  expect(cursor.date).toBe(1234567890123);
  expect(cursor.id).toBe('123');
});
