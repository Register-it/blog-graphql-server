function assertPostEquals(expected, actual) {
  expect(actual.id).toEqual(expected.id.toString());
  expect(actual.date).toEqual(expected.date.toISOString());
  expect(actual.readingTime).toEqual(expected.readingTime);
  expect(actual.title).toEqual(expected.title);
  expect(actual.subtitle).toEqual(expected.subtitle);
  expect(actual.content).toEqual(expected.content);
  if (expect.author) {
    expect(actual.author.id).toEqual(expect.author.id);
    expect(actual.author.image).toEqual(expect.author.image);
    expect(actual.author.displayName).toEqual(expect.author.displayName);
  }
}

function assertCommentEquals(expected, actual) {
  expect(actual.id).toEqual(expected.id.toString());
  expect(actual.date).toEqual(expected.date.toISOString());
  expect(actual.content).toEqual(expected.content);
  if (expect.author) {
    expect(actual.author.id).toEqual(expect.author.id);
    expect(actual.author.image).toEqual(expect.author.image);
    expect(actual.author.displayName).toEqual(expect.author.displayName);
  }
}

module.exports = {
  assertPostEquals,
  assertCommentEquals,
};
