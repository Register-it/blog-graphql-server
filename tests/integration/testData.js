function getTestAuthors() {
  return [
    {
      id: 987,
      image: 'image1',
      displayName: 'Author 987',
    },
    {
      id: 876,
      image: 'image2',
      displayName: 'Author 876',
    },
    {
      id: 765,
      image: 'image3',
      displayName: 'Author 765',
    },
  ];
}

function getTestPosts(n, withAuthor = false) {
  const authors = getTestAuthors();
  let posts = [
    {
      id: 789,
      date: new Date(1234567890789),
      readingTime: 78,
      title: 'Seven Eight Nine',
      subtitle: 'Counting from seven to nine',
      content: 'This is the content of 789',
      author: authors[1],
    },
    {
      id: 678,
      date: new Date(1234567890678),
      readingTime: 67,
      title: 'Six Seven Eight',
      subtitle: 'Counting from six to eight',
      content: 'This is the content of 678',
      author: authors[0],
    },
    {
      id: 567,
      date: new Date(1234567890567),
      readingTime: 56,
      title: 'Five Six Seven',
      subtitle: 'Counting from five to seven',
      content: 'This is the content of 567',
      author: authors[2],
    },
    {
      id: 456,
      date: new Date(1234567890456),
      readingTime: 45,
      title: 'Four Five Six',
      subtitle: 'Counting from four to six',
      content: 'This is the content of 456',
      author: authors[2],
    },
    {
      id: 345,
      date: new Date(1234567890345),
      readingTime: 34,
      title: 'Three Four Five',
      subtitle: 'Counting from three to five',
      content: 'This is the content of 345',
      author: authors[0],
    },
    {
      id: 234,
      date: new Date(1234567890234),
      readingTime: 23,
      title: 'Two Three Four',
      subtitle: 'Counting from two to four',
      content: 'This is the content of 234',
      author: authors[1],
    },
    {
      id: 123,
      date: new Date(1234567890123),
      readingTime: 12,
      title: 'One Two Three',
      subtitle: 'Counting from one to three',
      content: 'This is the content of 123',
      author: authors[1],
    },
  ];

  if (!withAuthor) {
    posts = posts.map(({ author, ...rest }) => rest);
  }

  return posts.slice(0, n);
}

function getTestComments(n, withAuthor = false) {
  const authors = getTestAuthors();
  let comments = [
    {
      id: 987,
      date: new Date(1234567890987),
      content: 'This is the content of 987',
      author: authors[2],
    },
    {
      id: 876,
      date: new Date(1234567890876),
      content: 'This is the content of 876',
      author: authors[1],
    },
    {
      id: 765,
      date: new Date(1234567890765),
      content: 'This is the content of 765',
      author: authors[0],
    },
    {
      id: 654,
      date: new Date(1234567890654),
      content: 'This is the content of 654',
      author: authors[2],
    },
    {
      id: 543,
      date: new Date(1234567890543),
      content: 'This is the content of 543',
      author: authors[0],
    },
    {
      id: 432,
      date: new Date(1234567890432),
      content: 'This is the content of 432',
      author: authors[2],
    },
    {
      id: 321,
      date: new Date(1234567890321),
      content: 'This is the content of 321',
      author: authors[0],
    },
  ];

  if (!withAuthor) {
    comments = comments.map(({ author, ...rest }) => rest);
  }

  return comments.slice(0, n);
}

module.exports = {
  getTestPosts,
  getTestComments,
};
