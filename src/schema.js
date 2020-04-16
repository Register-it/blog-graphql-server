const { gql } = require('apollo-server');

module.exports = gql`
  "a beautiful post"
  type Post {
    date: String!
    readingTime: Int!
    id: String!
    title: String!
    subtitle: String
    author: Author
    content: String!
    tags: [String]
    likes: Int
  }
  
  type Author {
    id: String!
    image: String!
    displayName: String!
  }

  type Query {
    posts: [Post]
    post(id: String!): Post
  }
`;

