const commentResolver = require('@src/resolvers/comment');
const { paginateByDateAndId } = require('@src/utils/pagination');

const mockDataSources = {
  db: {
    addComment: jest.fn(),
  },
};

const mockPubSub = {
  publish: jest.fn(),
  asyncIterator: jest.fn(),
};

jest.mock('apollo-server', () => ({
  withFilter: (iterator, filter) => (_parent, _args, context) => {
    expect(filter({ commentAdded: { postId: 123 } }, { postId: 123 })).toBeTruthy();
    expect(filter({ commentAdded: { postId: 123 } }, { postId: 234 })).toBeFalsy();
    return iterator(_parent, _args, context);
  },
}));

jest.mock('@src/utils/pagination');

it('returns a list of paginated comments with default values', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  paginateByDateAndId.mockResolvedValueOnce(expected);

  const comments = await commentResolver.Query.comments(
    null,
    { postId: 123 },
    { dataSources: mockDataSources },
  );

  expect(comments).toBe(expected);

  expect(paginateByDateAndId).toHaveBeenCalledTimes(1);
  expect(paginateByDateAndId).toHaveBeenCalledWith({
    dataSource: mockDataSources.db,
    method: 'findCommentsByPostId',
    args: [123],
    first: 5,
    after: undefined,
  });
});

it('returns a list of paginated comments with given size and starting point', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  paginateByDateAndId.mockResolvedValueOnce(expected);

  const comments = await commentResolver.Query.comments(
    null,
    { postId: 123, first: 10, after: '123123123abcabcabc' },
    { dataSources: mockDataSources },
  );

  expect(comments).toBe(expected);

  expect(paginateByDateAndId).toHaveBeenCalledTimes(1);
  expect(paginateByDateAndId).toHaveBeenCalledWith({
    dataSource: mockDataSources.db,
    method: 'findCommentsByPostId',
    args: [123],
    first: 10,
    after: '123123123abcabcabc',
  });
});

it('returns a list of default paginated comments as an attribute of a Post', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  paginateByDateAndId.mockResolvedValueOnce(expected);

  const comments = await commentResolver.Post.comments(
    { id: 123 },
    {},
    { dataSources: mockDataSources },
  );

  expect(comments).toBe(expected);

  expect(paginateByDateAndId).toHaveBeenCalledTimes(1);
  expect(paginateByDateAndId).toHaveBeenCalledWith({
    dataSource: mockDataSources.db,
    method: 'findCommentsByPostId',
    args: [123],
    first: 5,
    after: undefined,
  });
});

it('returns a list of tailored paginated comments as an attribute of a Post', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  paginateByDateAndId.mockResolvedValueOnce(expected);

  const comments = await commentResolver.Post.comments(
    { id: 123 },
    { first: 10, after: '123123123abcabcabc' },
    { dataSources: mockDataSources },
  );

  expect(comments).toBe(expected);

  expect(paginateByDateAndId).toHaveBeenCalledTimes(1);
  expect(paginateByDateAndId).toHaveBeenCalledWith({
    dataSource: mockDataSources.db,
    method: 'findCommentsByPostId',
    args: [123],
    first: 10,
    after: '123123123abcabcabc',
  });
});

it('adds a comment creating a new author', async () => {
  const expected = { id: 234 };
  mockDataSources.db.addComment.mockResolvedValueOnce(expected);

  const displayName = 'test author';
  const content = 'This is the content';

  const comment = await commentResolver.Mutation.addComment(
    null,
    { postId: 123, comment: { authorDisplayName: displayName, content } },
    { dataSources: mockDataSources, pubsub: mockPubSub },
  );

  expect(comment).toBe(expected);

  const author = { displayName, image: 'https://robohash.org/test%20author' };

  expect(mockDataSources.db.addComment).toHaveBeenCalledTimes(1);
  expect(mockDataSources.db.addComment).toHaveBeenCalledWith(123, author, content);

  expect(mockPubSub.publish).toHaveBeenCalledTimes(1);
  expect(mockPubSub.publish).toHaveBeenCalledWith('COMMENT_ADDED', { commentAdded: expected });
});

it('returns the comment date as an ISO string', async () => {
  const utcDate = '2020-06-13T10:00:00.000Z';
  const date = await commentResolver.Comment.date({ date: new Date(utcDate) });

  expect(date).toBe(utcDate);
});

it('subscribes to comment added on a post', async () => {
  mockPubSub.asyncIterator.mockResolvedValueOnce('connection');

  const subscription = await commentResolver.Subscription.commentAdded.subscribe(
    null,
    { postId: 123 },
    { pubsub: mockPubSub },
  );

  expect(subscription).toBe('connection');
  expect(mockPubSub.asyncIterator).toHaveBeenCalledTimes(1);
  expect(mockPubSub.asyncIterator).toHaveBeenCalledWith('COMMENT_ADDED');
});

afterEach(() => {
  paginateByDateAndId.mockClear();
  mockDataSources.db.addComment.mockClear();
  mockPubSub.asyncIterator.mockClear();
});
