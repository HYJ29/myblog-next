/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      providerType
      providerKey
      name
      photoUrl
      email
      createdAt
      updatedAt
      owner
      Posts {
        items {
          id
          editorState
          titlePhoto
          title
          subTitle
          userId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        providerType
        providerKey
        name
        photoUrl
        email
        createdAt
        updatedAt
        owner
        Posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        editorState
        titlePhoto
        title
        subTitle
        userId
        createdAt
        updatedAt
        owner
        tags {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      editorState
      titlePhoto
      title
      subTitle
      userId
      createdAt
      updatedAt
      owner
      tags {
        items {
          id
          userId
          postId
          tagId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const getPostTag = /* GraphQL */ `
  query GetPostTag($id: ID!) {
    getPostTag(id: $id) {
      id
      userId
      postId
      tagId
      createdAt
      updatedAt
      post {
        id
        editorState
        titlePhoto
        title
        subTitle
        userId
        createdAt
        updatedAt
        owner
        tags {
          nextToken
        }
      }
      owner
      tag {
        id
        tagName
        createdAt
        updatedAt
        posts {
          nextToken
        }
        owner
      }
    }
  }
`;
export const listPostTags = /* GraphQL */ `
  query ListPostTags(
    $filter: ModelPostTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        postId
        tagId
        createdAt
        updatedAt
        post {
          id
          editorState
          titlePhoto
          title
          subTitle
          userId
          createdAt
          updatedAt
          owner
        }
        owner
        tag {
          id
          tagName
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tagName
        createdAt
        updatedAt
        posts {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      tagName
      createdAt
      updatedAt
      posts {
        items {
          id
          userId
          postId
          tagId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
    }
  }
`;
