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
    comments: [Comment]
  }
  
  type Author {
    id: String!
    image: String!
    displayName: String!
  }

  type Comment {
    id: String!
    date: String!
    author: Author
    content: String!
  }

  type Query {
    posts: [Post]
    post(id: String!): Post
  }

  type Mutation {
    addLike(postId: String!): Int
  }
`;

