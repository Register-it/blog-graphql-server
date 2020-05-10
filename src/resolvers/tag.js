module.exports = {
  Post: {
    tags: (parent, _args, { tagsLoader }) => tagsLoader.load(parent.id),
  },
};
