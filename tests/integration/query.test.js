const { createTestClient } = require('apollo-server-testing');
const createServer = require('@src/server');
const { assertPostEquals, assertCommentEquals } = require('./utils');
const queries = require('./queries');
const { getTestPosts, getTestComments } = require('./testData');

const db = {
  findAllPosts: jest.fn(),
  findTagsByPostIds: jest.fn(),
  findLikesByPostIds: jest.fn(),
  findCommentsByPostId: jest.fn(),
  findPostById: jest.fn(),
};

const server = createServer(db);
const { query } = createTestClient(server);

it('returns an empty list if no posts are present', async () => {
  const expected = getTestPosts(0);
  db.findAllPosts.mockResolvedValueOnce(expected);

  const res = await query({ query: queries.GET_POSTS });

  expect(res.data.posts.nodes.length).toBe(0);
  expect(res.data.posts.hasMore).toBeFalsy();

  expect(db.findAllPosts).toHaveBeenCalledTimes(1);
  expect(db.findAllPosts.mock.calls[0][0].include).toEqual(expect.not.arrayContaining(['author']));
});

it('fetches a list of posts requiring basic data', async () => {
  const expected = getTestPosts(2);
  db.findAllPosts.mockResolvedValueOnce(expected);

  const res = await query({ query: queries.GET_POSTS });
  expect(res.data.posts.nodes.length).toBe(2);
  expect(res.data.posts.hasMore).toBeFalsy();
  assertPostEquals(expected[0], res.data.posts.nodes[0]);
  assertPostEquals(expected[1], res.data.posts.nodes[1]);

  expect(db.findAllPosts).toHaveBeenCalledTimes(1);

  const mockCall = db.findAllPosts.mock.calls[0];
  expect(mockCall[0]).toEqual(expect.not.arrayContaining(['author']));
  expect(mockCall[1]).toEqual(6);
});

it('paginate the posts with default size if no page size is given', async () => {
  const expected = getTestPosts(7);
  db.findAllPosts.mockResolvedValueOnce(expected.slice(0, 6))
    .mockResolvedValueOnce(expected.slice(5));

  const res1 = await query({ query: queries.GET_POSTS });

  expect(res1.data.posts.nodes.length).toBe(5);
  expect(res1.data.posts.hasMore).toBeTruthy();
  assertPostEquals(expected[0], res1.data.posts.nodes[0]);
  assertPostEquals(expected[1], res1.data.posts.nodes[1]);
  assertPostEquals(expected[2], res1.data.posts.nodes[2]);
  assertPostEquals(expected[3], res1.data.posts.nodes[3]);
  assertPostEquals(expected[4], res1.data.posts.nodes[4]);

  const res2 = await query({ query: queries.GET_POSTS, variables: { cursor: res1.data.posts.cursor } });

  expect(res2.data.posts.nodes.length).toBe(2);
  expect(res2.data.posts.hasMore).toBeFalsy();
  assertPostEquals(expected[5], res2.data.posts.nodes[0]);
  assertPostEquals(expected[6], res2.data.posts.nodes[1]);

  expect(db.findAllPosts).toHaveBeenCalledTimes(2);

  const mockCalls = db.findAllPosts.mock.calls;
  expect(mockCalls[0][0]).toEqual(expect.not.arrayContaining(['author']));
  expect(mockCalls[0][1]).toEqual(6);
  expect(mockCalls[1][0]).toEqual(expect.not.arrayContaining(['author']));
  expect(mockCalls[1][1]).toEqual(6);
});

it('paginates the posts with the given page size', async () => {
  const expected = getTestPosts(7);
  db.findAllPosts.mockResolvedValueOnce(expected.slice(0, 4))
    .mockResolvedValueOnce(expected.slice(3, 7))
    .mockResolvedValueOnce(expected.slice(6));

  const res1 = await query({ query: queries.GET_POSTS, variables: { first: 3 } });

  expect(res1.data.posts.nodes.length).toBe(3);
  expect(res1.data.posts.hasMore).toBeTruthy();
  assertPostEquals(expected[0], res1.data.posts.nodes[0]);
  assertPostEquals(expected[1], res1.data.posts.nodes[1]);
  assertPostEquals(expected[2], res1.data.posts.nodes[2]);

  const res2 = await query(
    {
      query: queries.GET_POSTS,
      variables: { first: 3, cursor: res1.data.posts.cursor },
    },
  );

  expect(res2.data.posts.nodes.length).toBe(3);
  expect(res2.data.posts.hasMore).toBeTruthy();
  assertPostEquals(expected[3], res2.data.posts.nodes[0]);
  assertPostEquals(expected[4], res2.data.posts.nodes[1]);
  assertPostEquals(expected[5], res2.data.posts.nodes[2]);

  const res3 = await query(
    {
      query: queries.GET_POSTS,
      variables: { first: 3, cursor: res2.data.posts.cursor },
    },
  );

  expect(res3.data.posts.nodes.length).toBe(1);
  expect(res3.data.posts.hasMore).toBeFalsy();
  assertPostEquals(expected[6], res3.data.posts.nodes[0]);

  expect(db.findAllPosts).toHaveBeenCalledTimes(3);

  const mockCalls = db.findAllPosts.mock.calls;
  expect(mockCalls[0][0]).toEqual(expect.not.arrayContaining(['author']));
  expect(mockCalls[0][1]).toEqual(4);
  expect(mockCalls[1][0]).toEqual(expect.not.arrayContaining(['author']));
  expect(mockCalls[1][1]).toEqual(4);
  expect(mockCalls[2][0]).toEqual(expect.not.arrayContaining(['author']));
  expect(mockCalls[2][1]).toEqual(4);
});

it('returns posts with the author', async () => {
  const expected = getTestPosts(3, true);
  db.findAllPosts.mockResolvedValueOnce(expected);

  const res = await query({ query: queries.GET_POSTS_WITH_AUTHOR });

  expect(res.data.posts.nodes.length).toBe(3);
  assertPostEquals(expected[0], res.data.posts.nodes[0]);
  assertPostEquals(expected[1], res.data.posts.nodes[1]);
  assertPostEquals(expected[2], res.data.posts.nodes[2]);

  expect(db.findAllPosts).toHaveBeenCalledTimes(1);

  const mockCall = db.findAllPosts.mock.calls[0];
  expect(mockCall[0]).toEqual(expect.arrayContaining(['author']));
  expect(mockCall[1]).toEqual(6);
});

it('returns posts with tags', async () => {
  const expected = getTestPosts(3);
  db.findAllPosts.mockResolvedValueOnce(expected);

  const tags0 = ['tag1', 'tag2', 'tag3'];
  const tags1 = [];
  const tags2 = ['tag2'];
  db.findTagsByPostIds.mockResolvedValueOnce([tags0, tags1, tags2]);

  const res = await query({ query: queries.GET_POSTS_WITH_TAGS });

  expect(res.data.posts.nodes.length).toBe(3);

  assertPostEquals(expected[0], res.data.posts.nodes[0]);
  expect(res.data.posts.nodes[0].tags).toEqual(tags0);

  assertPostEquals(expected[1], res.data.posts.nodes[1]);
  expect(res.data.posts.nodes[1].tags).toEqual(tags1);

  assertPostEquals(expected[2], res.data.posts.nodes[2]);
  expect(res.data.posts.nodes[2].tags).toEqual(tags2);

  expect(db.findAllPosts).toHaveBeenCalledTimes(1);
  expect(db.findTagsByPostIds).toHaveBeenCalledTimes(1);
  expect(db.findTagsByPostIds).toHaveBeenCalledWith(expected.map((p) => p.id));
});

it('returns posts with likes', async () => {
  const expected = getTestPosts(3);
  db.findAllPosts.mockResolvedValueOnce(expected);

  db.findLikesByPostIds.mockResolvedValueOnce([0, 333, 66]);

  const res = await query({ query: queries.GET_POSTS_WITH_LIKES });

  expect(res.data.posts.nodes.length).toBe(3);

  assertPostEquals(expected[0], res.data.posts.nodes[0]);
  expect(res.data.posts.nodes[0].likes).toBe(0);

  assertPostEquals(expected[1], res.data.posts.nodes[1]);
  expect(res.data.posts.nodes[1].likes).toBe(333);

  assertPostEquals(expected[2], res.data.posts.nodes[2]);
  expect(res.data.posts.nodes[2].likes).toBe(66);

  expect(db.findAllPosts).toHaveBeenCalledTimes(1);
  expect(db.findLikesByPostIds).toHaveBeenCalledTimes(1);
  expect(db.findLikesByPostIds).toHaveBeenCalledWith(expected.map((p) => p.id));
});

it('returns posts with comments', async () => {
  const expectedPosts = getTestPosts(2);
  db.findAllPosts.mockResolvedValueOnce(expectedPosts);

  const comments = getTestComments(7, true);
  db.findCommentsByPostId
    .mockResolvedValueOnce(comments.slice(0, 1))
    .mockResolvedValueOnce(comments.slice(1));

  const res = await query({ query: queries.GET_POSTS_WITH_COMMENTS });

  expect(res.data.posts.nodes.length).toBe(2);

  assertPostEquals(expectedPosts[0], res.data.posts.nodes[0]);
  expect(res.data.posts.nodes[0].comments.hasMore).toBeFalsy();
  const post0Comments = res.data.posts.nodes[0].comments.nodes;
  expect(post0Comments.length).toBe(1);
  assertCommentEquals(comments[0], post0Comments[0]);

  assertPostEquals(expectedPosts[1], res.data.posts.nodes[1]);
  expect(res.data.posts.nodes[1].comments.hasMore).toBeTruthy();
  const post1Comments = res.data.posts.nodes[1].comments.nodes;
  expect(post1Comments.length).toBe(5);
  assertCommentEquals(comments[1], post1Comments[0]);
  assertCommentEquals(comments[2], post1Comments[1]);
  assertCommentEquals(comments[3], post1Comments[2]);
  assertCommentEquals(comments[4], post1Comments[3]);
  assertCommentEquals(comments[5], post1Comments[4]);

  expect(db.findAllPosts).toHaveBeenCalledTimes(1);
  expect(db.findCommentsByPostId).toHaveBeenCalledTimes(2);
});

it('returns a single post with all the details', async () => {
  const expectedPost = getTestPosts(1, true)[0];
  db.findPostById.mockResolvedValueOnce(expectedPost);

  const expectedTags = ['tag1', 'tag2'];
  db.findTagsByPostIds.mockResolvedValueOnce([expectedTags]);

  db.findLikesByPostIds.mockResolvedValueOnce([42]);

  const comments = getTestComments(6, true);
  db.findCommentsByPostId.mockResolvedValueOnce(comments);

  const res = await query({ query: queries.GET_SINGLE_POST_WITH_DETAILS, variables: { id: '789' } });

  assertPostEquals(expectedPost, res.data.post);
  expect(res.data.post.tags).toEqual(expectedTags);
  expect(res.data.post.likes).toBe(42);

  expect(res.data.post.comments.hasMore).toBeTruthy();
  const postComments = res.data.post.comments.nodes;
  expect(postComments.length).toBe(5);
  assertCommentEquals(comments[0], postComments[0]);
  assertCommentEquals(comments[1], postComments[1]);
  assertCommentEquals(comments[2], postComments[2]);
  assertCommentEquals(comments[3], postComments[3]);
  assertCommentEquals(comments[4], postComments[4]);

  expect(db.findPostById).toHaveBeenCalledTimes(1);
  expect(db.findPostById.mock.calls[0][0]).toBe('789');
  expect(db.findLikesByPostIds).toHaveBeenCalledTimes(1);
  expect(db.findLikesByPostIds).toHaveBeenCalledWith([789]);
  expect(db.findTagsByPostIds).toHaveBeenCalledTimes(1);
  expect(db.findTagsByPostIds).toHaveBeenCalledWith([789]);
  expect(db.findCommentsByPostId).toHaveBeenCalledTimes(1);
  expect(db.findCommentsByPostId.mock.calls[0][0]).toBe(789);
});

it('paginates the comments associated to a post with default page size', async () => {
  const comments = getTestComments(7, true);
  db.findCommentsByPostId
    .mockResolvedValueOnce(comments.slice(0, 6))
    .mockResolvedValueOnce(comments.slice(5));

  const page1 = await query({ query: queries.GET_COMMENTS, variables: { postId: '789' } });

  const { cursor } = page1.data.comments;
  expect(page1.data.comments.hasMore).toBeTruthy();
  expect(page1.data.comments.nodes.length).toBe(5);

  assertCommentEquals(comments[0], page1.data.comments.nodes[0]);
  assertCommentEquals(comments[1], page1.data.comments.nodes[1]);
  assertCommentEquals(comments[2], page1.data.comments.nodes[2]);
  assertCommentEquals(comments[3], page1.data.comments.nodes[3]);
  assertCommentEquals(comments[4], page1.data.comments.nodes[4]);

  const page2 = await query({ query: queries.GET_COMMENTS, variables: { postId: '789', cursor } });

  expect(page2.data.comments.hasMore).toBeFalsy();
  expect(page2.data.comments.nodes.length).toBe(2);

  assertCommentEquals(comments[5], page2.data.comments.nodes[0]);
  assertCommentEquals(comments[6], page2.data.comments.nodes[1]);

  expect(db.findCommentsByPostId).toHaveBeenCalledTimes(2);
});

afterEach(() => {
  db.findAllPosts.mockClear();
  db.findTagsByPostIds.mockClear();
  db.findLikesByPostIds.mockClear();
  db.findCommentsByPostId.mockClear();
  db.findPostById.mockClear();
});
