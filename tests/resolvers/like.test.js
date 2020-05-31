const likeResolver = require('@src/resolvers/like');

const mockDataSource = {
  db: {
    addLike: jest.fn(),
  },
};

const mockPubSub = {
  publish: jest.fn(),
  asyncIterator: jest.fn(),
};

const mockLikesLoader = {
  load: jest.fn(),
};

jest.mock('apollo-server', () => ({
  withFilter: (iterator, filter) => (_parent, _args, context) => {
    expect(filter({ postId: 123 }, { postId: 123 })).toBeTruthy();
    expect(filter({ postId: 123 }, { postId: 234 })).toBeFalsy();
    return iterator(_parent, _args, context);
  },
}));

it('adds likes and publish event for subscription', async () => {
  mockDataSource.db.addLike.mockResolvedValueOnce(321);

  const likes = await likeResolver.Mutation.addLike(
    null,
    { postId: 123 },
    { dataSources: mockDataSource, pubsub: mockPubSub },
  );

  expect(likes).toBe(321);
  expect(mockDataSource.db.addLike).toHaveBeenCalledTimes(1);
  expect(mockDataSource.db.addLike).toHaveBeenCalledWith(123);

  expect(mockPubSub.publish).toHaveBeenCalledTimes(1);
  expect(mockPubSub.publish).toHaveBeenCalledWith('LIKE_ADDED', { likeAdded: 321, postId: 123 });
});

it('calls the loader to resolve likes value on a post', async () => {
  mockLikesLoader.load.mockResolvedValueOnce(321);

  const likes = await likeResolver.Post.likes(
    { id: 123 },
    null,
    { likesLoader: mockLikesLoader },
  );

  expect(likes).toBe(321);
  expect(mockLikesLoader.load).toHaveBeenCalledTimes(1);
  expect(mockLikesLoader.load).toHaveBeenCalledWith(123);
});

it('subscribes to likes added on a post', async () => {
  mockPubSub.asyncIterator.mockResolvedValueOnce('connection');

  const subscription = await likeResolver.Subscription.likeAdded.subscribe(
    null,
    { postId: 123 },
    { pubsub: mockPubSub },
  );

  expect(subscription).toBe('connection');
  expect(mockPubSub.asyncIterator).toHaveBeenCalledTimes(1);
  expect(mockPubSub.asyncIterator).toHaveBeenCalledWith('LIKE_ADDED');
});

afterEach(() => {
  mockDataSource.db.addLike.mockClear();
  mockPubSub.publish.mockClear();
  mockPubSub.asyncIterator.mockClear();
  mockLikesLoader.load.mockClear();
});
