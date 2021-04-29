/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      providerKey
      userNickname
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
export const onCreatePostTag = /* GraphQL */ `
  subscription OnCreatePostTag {
    onCreatePostTag {
      id
      userId
      postId
      tagId
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
export const onUpdatePostTag = /* GraphQL */ `
  subscription OnUpdatePostTag {
    onUpdatePostTag {
      id
      userId
      postId
      tagId
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
export const onDeletePostTag = /* GraphQL */ `
  subscription OnDeletePostTag {
    onDeletePostTag {
      id
      userId
      postId
      tagId
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
