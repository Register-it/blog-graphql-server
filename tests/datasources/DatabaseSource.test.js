const DatabaseSource = require('@src/datasources/DatabaseSource');

const models = {
  post: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  author: { id: 'authorModel' },
  tag: {
    findAll: jest.fn(),
  },
  reaction: {
    findAll: jest.fn(),
    findOne: jest.fn(),
  },
  comment: {
    findAll: jest.fn(),
    create: jest.fn(),
  },
};

function getTestItems() {
  return [
    { id: 123 },
    { id: 234 },
    { id: 345 },
  ];
}

function getTestReactions() {
  return [
    {
      postId: 123,
      likes: 321,
    },
    {
      postId: 234,
      likes: 432,
    },
    {
      postId: 345,
      likes: 543,
    },
  ];
}

function getTestTags() {
  return [
    {
      name: 'tag1',
      posts: [
        { id: 123 },
        { id: 345 },
      ],
    },
    {
      name: 'tag2',
      posts: [
        { id: 234 },
      ],
    },
    {
      name: 'tag3',
      posts: [
        { id: 234 },
        { id: 345 },
      ],
    },
    {
      name: 'tag4',
      posts: [
        { id: 123 },
        { id: 234 },
        { id: 345 },
      ],
    },
  ];
}

it('finds all posts with the given bounds', async () => {
  const expected = getTestItems();
  models.post.findAll.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findAllPosts([], 12, { date: 123, id: '234' });

  expect(results).toEqual(expected);

  expect(models.post.findAll).toHaveBeenCalledTimes(1);

  const argument = models.post.findAll.mock.calls[0][0];
  expect(argument.include.length).toBe(0);
  expect(argument.limit).toBe(12);
});

it('includes in the query only existing models', async () => {
  const expected = getTestItems();
  models.post.findAll.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findAllPosts(['author', 'banana'], 12, { date: 123, id: '234' });

  expect(results).toEqual(expected);

  expect(models.post.findAll).toHaveBeenCalledTimes(1);

  const argument = models.post.findAll.mock.calls[0][0];
  expect(argument.include.length).toBe(1);
  expect(argument.include[0]).toBe(models.author);
  expect(argument.limit).toBe(12);
});

it('finds a single post by id', async () => {
  const expected = getTestItems()[0];
  models.post.findByPk.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findPostById(321);

  expect(results).toEqual(expected);

  expect(models.post.findByPk).toHaveBeenCalledTimes(1);

  const call = models.post.findByPk.mock.calls[0];
  expect(call[0]).toBe(321);
  expect(call[1].include).toEqual([]);
});

it('finds a single post by id with included models', async () => {
  const expected = getTestItems()[0];
  models.post.findByPk.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findPostById(321, ['author', 'banana']);

  expect(results).toEqual(expected);

  expect(models.post.findByPk).toHaveBeenCalledTimes(1);

  const call = models.post.findByPk.mock.calls[0];
  expect(call[0]).toBe(321);
  expect(call[1].include.length).toBe(1);
  expect(call[1].include[0]).toEqual(models.author);
});

it('finds the tags associated to a list of post ids', async () => {
  const expected = getTestTags();
  models.tag.findAll.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findTagsByPostIds([123, 234, 345, 456]);

  expect(results.length).toBe(4);
  expect(results[0]).toEqual(['tag1', 'tag4']);
  expect(results[1]).toEqual(['tag2', 'tag3', 'tag4']);
  expect(results[2]).toEqual(['tag1', 'tag3', 'tag4']);
  expect(results[3]).toEqual([]);

  expect(models.tag.findAll).toHaveBeenCalledTimes(1);
});

it('finds reactions associated to a list of post ids', async () => {
  const expected = getTestReactions();
  models.reaction.findAll.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findLikesByPostIds([123, 234, 345]);

  expect(results.length).toBe(3);
  expect(results[0]).toBe(321);
  expect(results[1]).toBe(432);
  expect(results[2]).toBe(543);

  expect(models.reaction.findAll).toHaveBeenCalledTimes(1);
});

it('finds all comments associated to a post, with the given bounds', async () => {
  const expected = getTestItems();
  models.comment.findAll.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.findCommentsByPostId(234, 12, { date: 123, id: '234' });

  expect(results).toEqual(expected);

  expect(models.comment.findAll).toHaveBeenCalledTimes(1);

  const argument = models.comment.findAll.mock.calls[0][0];
  expect(argument.include.length).toBe(1);
  expect(argument.include[0]).toEqual(models.author);
  expect(argument.limit).toBe(12);
});

it('adds a like to a post', async () => {
  const expected = { likes: 123, save: jest.fn() };
  models.reaction.findOne.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.addLike(234);

  expect(results).toBe(124);
  expect(models.reaction.findOne).toHaveBeenCalledTimes(1);
  expect(expected.save.mock.calls.length).toBe(1);
});

it('adds a comment to a post', async () => {
  const expected = { id: 123 };
  models.comment.create.mockResolvedValueOnce(expected);

  const testing = new DatabaseSource({ models });
  const results = await testing.addComment(234, { authorDisplayName: 'testAuthor', content: 'testContent' });

  expect(results).toBe(expected);

  expect(models.comment.create).toHaveBeenCalledTimes(1);

  const argument = models.comment.create.mock.calls[0][0];
  expect(argument.postId).toBe(234);
  expect(argument.content).toBe('testContent');
  expect(argument.author.displayName).toBe('testAuthor');
});

afterEach(() => {
  models.post.findAll.mockClear();
  models.post.findByPk.mockClear();
  models.tag.findAll.mockClear();
  models.reaction.findAll.mockClear();
  models.reaction.findOne.mockClear();
  models.comment.findAll.mockClear();
  models.comment.create.mockClear();
});
