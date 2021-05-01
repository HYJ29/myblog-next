/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createPostTag = /* GraphQL */ `
  mutation CreatePostTag(
    $input: CreatePostTagInput!
    $condition: ModelPostTagConditionInput
  ) {
    createPostTag(input: $input, condition: $condition) {
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
export const updatePostTag = /* GraphQL */ `
  mutation UpdatePostTag(
    $input: UpdatePostTagInput!
    $condition: ModelPostTagConditionInput
  ) {
    updatePostTag(input: $input, condition: $condition) {
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
export const deletePostTag = /* GraphQL */ `
  mutation DeletePostTag(
    $input: DeletePostTagInput!
    $condition: ModelPostTagConditionInput
  ) {
    deletePostTag(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createPostImage = /* GraphQL */ `
  mutation CreatePostImage(
    $input: CreatePostImageInput!
    $condition: ModelPostImageConditionInput
  ) {
    createPostImage(input: $input, condition: $condition) {
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
export const updatePostImage = /* GraphQL */ `
  mutation UpdatePostImage(
    $input: UpdatePostImageInput!
    $condition: ModelPostImageConditionInput
  ) {
    updatePostImage(input: $input, condition: $condition) {
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
export const deletePostImage = /* GraphQL */ `
  mutation DeletePostImage(
    $input: DeletePostImageInput!
    $condition: ModelPostImageConditionInput
  ) {
    deletePostImage(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
