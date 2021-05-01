/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      providerKey
      userNickname
      baseType
      photoUrl
      email
      createdAt
      updatedAt
      owner
      Posts {
        items {
          id
          rawContentState
          titlePhoto
          title
          subTitle
          userId
          baseType
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
        providerKey
        userNickname
        baseType
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
export const userByProviderKey = /* GraphQL */ `
  query UserByProviderKey(
    $providerKey: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByProviderKey(
      providerKey: $providerKey
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        providerKey
        userNickname
        baseType
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
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        updatedAt
        owner
        postTags {
          nextToken
        }
        postImages {
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
      rawContentState
      titlePhoto
      title
      subTitle
      userId
      baseType
      createdAt
      updatedAt
      owner
      postTags {
        items {
          id
          userId
          postId
          tagId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      postImages {
        items {
          id
          userId
          postId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const postByCreatedAt = /* GraphQL */ `
  query PostByCreatedAt(
    $baseType: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByCreatedAt(
      baseType: $baseType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        updatedAt
        owner
        postTags {
          nextToken
        }
        postImages {
          nextToken
        }
      }
      nextToken
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
      baseType
      createdAt
      updatedAt
      post {
        id
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        updatedAt
        owner
        postTags {
          nextToken
        }
        postImages {
          nextToken
        }
      }
      owner
      tag {
        id
        tagName
        baseType
        createdAt
        updatedAt
        postTags {
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
        baseType
        createdAt
        updatedAt
        post {
          id
          rawContentState
          titlePhoto
          title
          subTitle
          userId
          baseType
          createdAt
          updatedAt
          owner
        }
        owner
        tag {
          id
          tagName
          baseType
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;
export const postTagsByPostIdAndTagId = /* GraphQL */ `
  query PostTagsByPostIdAndTagId(
    $baseType: String
    $postIdTagId: ModelPostTagPostTagsByPostIdAndTagIdCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postTagsByPostIdAndTagId(
      baseType: $baseType
      postIdTagId: $postIdTagId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        postId
        tagId
        baseType
        createdAt
        updatedAt
        post {
          id
          rawContentState
          titlePhoto
          title
          subTitle
          userId
          baseType
          createdAt
          updatedAt
          owner
        }
        owner
        tag {
          id
          tagName
          baseType
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
        baseType
        createdAt
        updatedAt
        postTags {
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
      baseType
      createdAt
      updatedAt
      postTags {
        items {
          id
          userId
          postId
          tagId
          baseType
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
export const tagByTagName = /* GraphQL */ `
  query TagByTagName(
    $baseType: String
    $tagName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagByTagName(
      baseType: $baseType
      tagName: $tagName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tagName
        baseType
        createdAt
        updatedAt
        postTags {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getPostImage = /* GraphQL */ `
  query GetPostImage($id: ID!) {
    getPostImage(id: $id) {
      id
      userId
      postId
      imageId
      baseType
      createdAt
      updatedAt
      post {
        id
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        updatedAt
        owner
        postTags {
          nextToken
        }
        postImages {
          nextToken
        }
      }
      owner
      image {
        id
        url
        imageKey
        baseType
        isPublished
        createdAt
        updatedAt
        postImages {
          nextToken
        }
        owner
      }
    }
  }
`;
export const listPostImages = /* GraphQL */ `
  query ListPostImages(
    $filter: ModelPostImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        postId
        imageId
        baseType
        createdAt
        updatedAt
        post {
          id
          rawContentState
          titlePhoto
          title
          subTitle
          userId
          baseType
          createdAt
          updatedAt
          owner
        }
        owner
        image {
          id
          url
          imageKey
          baseType
          isPublished
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;
export const postImageByPostIdAndImageId = /* GraphQL */ `
  query PostImageByPostIdAndImageId(
    $postId: ID
    $imageId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postImageByPostIdAndImageId(
      postId: $postId
      imageId: $imageId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        postId
        imageId
        baseType
        createdAt
        updatedAt
        post {
          id
          rawContentState
          titlePhoto
          title
          subTitle
          userId
          baseType
          createdAt
          updatedAt
          owner
        }
        owner
        image {
          id
          url
          imageKey
          baseType
          isPublished
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        imageKey
        baseType
        isPublished
        createdAt
        updatedAt
        postImages {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      id
      url
      imageKey
      baseType
      isPublished
      createdAt
      updatedAt
      postImages {
        items {
          id
          userId
          postId
          imageId
          baseType
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
export const imageByCreatedAt = /* GraphQL */ `
  query ImageByCreatedAt(
    $baseType: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imageByCreatedAt(
      baseType: $baseType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        url
        imageKey
        baseType
        isPublished
        createdAt
        updatedAt
        postImages {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
