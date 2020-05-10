const { gql } = require('apollo-server');

const GET_POSTS = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      cursor
      hasMore
      nodes {
        id
        date
        readingTime
        title
        subtitle
        content
      }
    }
  }
`;

const GET_POSTS_WITH_AUTHOR = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      cursor
      hasMore
      nodes {
        id
        date
        readingTime
        title
        subtitle
        content
        author {
          id
          image
          displayName
        }
      }
    }
  }
`;

const GET_POSTS_WITH_TAGS = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      cursor
      hasMore
      nodes {
        id
        date
        readingTime
        title
        subtitle
        content
        tags
      }
    }
  }
`;

const GET_POSTS_WITH_LIKES = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      cursor
      hasMore
      nodes {
        id
        date
        readingTime
        title
        subtitle
        content
        likes
      }
    }
  }
`;

const GET_POSTS_WITH_COMMENTS = gql`
  query getPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      cursor
      hasMore
      nodes {
        id
        date
        readingTime
        title
        subtitle
        content
        comments {
          hasMore
          nodes {
            id
            author {
              displayName
            }
            date
            content
          }
        }
      }
    }
  }
`;

const GET_SINGLE_POST_WITH_DETAILS = gql`
  query getPost($id: String!) {
    post(id: $id) {
      id
      date
      readingTime
      title
      subtitle
      content
      author {
        id
        image
        displayName
      }
      tags
      likes
      comments {
        hasMore
        nodes {
          id
          author {
            image
            displayName
          }
          date
          content
        }
      }
    }
  }
`;

const GET_COMMENTS = gql`
  query getComments($postId: String!, $first: Int, $after: String) {
    comments(postId: $postId, first: $first, after: $after) {
      hasMore
      cursor
      nodes {
        id
        author {
          image
          displayName
        }
        date
        content
      }
    }
  }
`;

module.exports = {
  GET_POSTS,
  GET_POSTS_WITH_AUTHOR,
  GET_POSTS_WITH_LIKES,
  GET_POSTS_WITH_TAGS,
  GET_POSTS_WITH_COMMENTS,
  GET_SINGLE_POST_WITH_DETAILS,
  GET_COMMENTS,
};
