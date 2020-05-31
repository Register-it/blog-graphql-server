const tagResolver = require('@src/resolvers/tag');

const mockTagsLoader = {
  load: jest.fn(),
};

it('returns a list of tags as an attribute of a Post', async () => {
  const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
  mockTagsLoader.load.mockResolvedValueOnce(expected);

  const tags = await tagResolver.Post.tags(
    { id: 123 },
    null,
    { tagsLoader: mockTagsLoader },
  );

  expect(tags).toBe(expected);

  expect(mockTagsLoader.load).toHaveBeenCalledTimes(1);
  expect(mockTagsLoader.load).toHaveBeenCalledWith(123);
});

afterEach(() => {
  mockTagsLoader.load.mockClear();
});
