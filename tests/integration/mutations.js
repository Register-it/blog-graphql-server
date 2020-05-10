const { gql } = require('apollo-server');

const ADD_LIKE = gql`
  mutation addLike($postId: String!) {
    addLike(postId: $postId)
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $authorName: String!, $content: String!) {
    addComment(postId: $postId, comment: { authorDisplayName: $authorName, content: $content }) {
      id
      author {
        displayName
      }
      date
      content
    }
  }
`;

module.exports = {
  ADD_LIKE,
  ADD_COMMENT,
};
