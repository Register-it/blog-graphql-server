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
    comments(first: Int, after: String): CommentConnection!
  }

  "paginated list of comments"
  type CommentConnection {
    cursor: String!
    hasMore: Boolean!
    nodes: [Comment]!
  }

  "paginated list of posts"
  type PostConnection {
    cursor: String!
    hasMore: Boolean!
    nodes: [Post]!
  }

  "the author of a post or a comment"
  type Author {
    id: String!
    image: String!
    displayName: String!
  }

  "a comment to a post"
  type Comment {
    id: String!
    date: String!
    author: Author
    content: String!
  }

  type Query {
    posts(first: Int, after: String): PostConnection!
    post(id: String!): Post,
    comments(postId: String!, first: Int, after: String): CommentConnection!
  }

  type Mutation {
    addLike(postId: String!): Int
  }
`;

