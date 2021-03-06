const { createTestClient } = require('apollo-server-testing');
const createServer = require('@src/server');
const { assertCommentEquals } = require('./utils');
const mutations = require('./mutations');

const db = {
  addLike: jest.fn(),
  addComment: jest.fn(),
};

const server = createServer(db);
const { mutate } = createTestClient(server);

it('adds a like to a post', async () => {
  db.addLike.mockResolvedValueOnce(13);

  const res = await mutate({ query: mutations.ADD_LIKE, variables: { postId: '123' } });

  expect(res.data.addLike).toBe(13);

  expect(db.addLike).toHaveBeenCalledTimes(1);
  expect(db.addLike).toHaveBeenCalledWith('123');
});

it('adds a comment to a post', async () => {
  const postId = '123';
  const authorName = 'Test Author';
  const image = 'https://robohash.org/Test%20Author';
  const content = 'This is the content of the comment';
  const comment = {
    id: 42,
    date: new Date(),
    content,
    author: {
      image,
      displayName: authorName,
    },
  };

  db.addComment.mockResolvedValueOnce(comment);

  const res = await mutate({ query: mutations.ADD_COMMENT, variables: { postId, authorName, content } });

  assertCommentEquals(comment, res.data.addComment);

  expect(db.addComment).toHaveBeenCalledTimes(1);
  expect(db.addComment).toHaveBeenCalledWith(postId, { displayName: authorName, image }, content);
});

afterEach(() => {
  db.addLike.mockClear();
  db.addComment.mockClear();
});
