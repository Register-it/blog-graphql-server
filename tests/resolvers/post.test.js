const postResolver = require('@src/resolvers/post');
const { paginateByDateAndId } = require('@src/utils/pagination');

const info = {};
const mockDataSources = {
  db: {
    findPostById: jest.fn(),
  },
};

jest.mock('@src/utils/pagination');
jest.mock('@src/utils/getIncludedObjects', () => () => 'getIncludedObjects');

it('returns a list of paginated posts with default values', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  paginateByDateAndId.mockResolvedValueOnce(expected);

  const posts = await postResolver.Query.posts(
    null,
    {},
    { dataSources: mockDataSources },
    info,
  );

  expect(posts).toBe(expected);

  expect(paginateByDateAndId).toHaveBeenCalledTimes(1);
  expect(paginateByDateAndId).toHaveBeenCalledWith({
    dataSource: mockDataSources.db,
    method: 'findAllPosts',
    args: ['getIncludedObjects'],
    first: 5,
    after: undefined,
  });
});

it('returns a list of paginated comments with given size and starting point', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  paginateByDateAndId.mockResolvedValueOnce(expected);

  const posts = await postResolver.Query.posts(
    null,
    { first: 10, after: '123123123abcabcabc' },
    { dataSources: mockDataSources },
    info,
  );

  expect(posts).toBe(expected);

  expect(paginateByDateAndId).toHaveBeenCalledTimes(1);
  expect(paginateByDateAndId).toHaveBeenCalledWith({
    dataSource: mockDataSources.db,
    method: 'findAllPosts',
    args: ['getIncludedObjects'],
    first: 10,
    after: '123123123abcabcabc',
  });
});

it('returns a single post', async () => {
  const expected = { id: 1 };
  mockDataSources.db.findPostById.mockResolvedValueOnce(expected);

  const post = await postResolver.Query.post(
    null,
    { id: 123 },
    { dataSources: mockDataSources },
    info,
  );

  expect(post).toBe(expected);

  expect(mockDataSources.db.findPostById).toHaveBeenCalledTimes(1);
  expect(mockDataSources.db.findPostById).toHaveBeenCalledWith(123, 'getIncludedObjects');
});

it('returns the post date as an ISO string', async () => {
  const utcDate = '2020-06-13T10:00:00.000Z';
  const date = await postResolver.Post.date({ date: new Date(utcDate) });

  expect(date).toBe(utcDate);
});

afterEach(() => {
  paginateByDateAndId.mockClear();
  mockDataSources.db.findPostById.mockClear();
});
