/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDraft = /* GraphQL */ `
  subscription OnCreateDraft($owner: String!) {
    onCreateDraft(owner: $owner) {
      id
      rawContentState
      titlePhoto
      title
      subTitle
      userId
      baseType
      createdAt
      draftImages {
        items {
          id
          userId
          draftId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const onUpdateDraft = /* GraphQL */ `
  subscription OnUpdateDraft($owner: String!) {
    onUpdateDraft(owner: $owner) {
      id
      rawContentState
      titlePhoto
      title
      subTitle
      userId
      baseType
      createdAt
      draftImages {
        items {
          id
          userId
          draftId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const onDeleteDraft = /* GraphQL */ `
  subscription OnDeleteDraft($owner: String!) {
    onDeleteDraft(owner: $owner) {
      id
      rawContentState
      titlePhoto
      title
      subTitle
      userId
      baseType
      createdAt
      draftImages {
        items {
          id
          userId
          draftId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      updatedAt
      owner
    }
  }
`;
export const onCreateDraftImage = /* GraphQL */ `
  subscription OnCreateDraftImage($owner: String!) {
    onCreateDraftImage(owner: $owner) {
      id
      userId
      draftId
      imageId
      baseType
      draft {
        id
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        draftImages {
          nextToken
        }
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
      image {
        id
        userId
        url
        imageKey
        baseType
        isPublished
        isSaved
        createdAt
        draftImages {
          nextToken
        }
        updatedAt
        postImages {
          nextToken
        }
        owner
      }
    }
  }
`;
export const onUpdateDraftImage = /* GraphQL */ `
  subscription OnUpdateDraftImage($owner: String!) {
    onUpdateDraftImage(owner: $owner) {
      id
      userId
      draftId
      imageId
      baseType
      draft {
        id
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        draftImages {
          nextToken
        }
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
      image {
        id
        userId
        url
        imageKey
        baseType
        isPublished
        isSaved
        createdAt
        draftImages {
          nextToken
        }
        updatedAt
        postImages {
          nextToken
        }
        owner
      }
    }
  }
`;
export const onDeleteDraftImage = /* GraphQL */ `
  subscription OnDeleteDraftImage($owner: String!) {
    onDeleteDraftImage(owner: $owner) {
      id
      userId
      draftId
      imageId
      baseType
      draft {
        id
        rawContentState
        titlePhoto
        title
        subTitle
        userId
        baseType
        createdAt
        draftImages {
          nextToken
        }
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
      image {
        id
        userId
        url
        imageKey
        baseType
        isPublished
        isSaved
        createdAt
        draftImages {
          nextToken
        }
        updatedAt
        postImages {
          nextToken
        }
        owner
      }
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      providerKey
      userNickname
      baseType
      photoUrl
      email
      Drafts {
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
      Images {
        items {
          id
          userId
          url
          imageKey
          baseType
          isPublished
          isSaved
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
      Drafts {
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
      Images {
        items {
          id
          userId
          url
          imageKey
          baseType
          isPublished
          isSaved
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
      Drafts {
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
      Images {
        items {
          id
          userId
          url
          imageKey
          baseType
          isPublished
          isSaved
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
        userId
        url
        imageKey
        baseType
        isPublished
        isSaved
        createdAt
        draftImages {
          nextToken
        }
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
        userId
        url
        imageKey
        baseType
        isPublished
        isSaved
        createdAt
        draftImages {
          nextToken
        }
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
        userId
        url
        imageKey
        baseType
        isPublished
        isSaved
        createdAt
        draftImages {
          nextToken
        }
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
      userId
      url
      imageKey
      baseType
      isPublished
      isSaved
      createdAt
      draftImages {
        items {
          id
          userId
          draftId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
      userId
      url
      imageKey
      baseType
      isPublished
      isSaved
      createdAt
      draftImages {
        items {
          id
          userId
          draftId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
      userId
      url
      imageKey
      baseType
      isPublished
      isSaved
      createdAt
      draftImages {
        items {
          id
          userId
          draftId
          imageId
          baseType
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
