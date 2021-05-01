/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreatePostTag = /* GraphQL */ `
  subscription OnCreatePostTag {
    onCreatePostTag {
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
export const onUpdatePostTag = /* GraphQL */ `
  subscription OnUpdatePostTag {
    onUpdatePostTag {
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
export const onDeletePostTag = /* GraphQL */ `
  subscription OnDeletePostTag {
    onDeletePostTag {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreatePostImage = /* GraphQL */ `
  subscription OnCreatePostImage {
    onCreatePostImage {
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
export const onUpdatePostImage = /* GraphQL */ `
  subscription OnUpdatePostImage {
    onUpdatePostImage {
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
export const onDeletePostImage = /* GraphQL */ `
  subscription OnDeletePostImage {
    onDeletePostImage {
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
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
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
