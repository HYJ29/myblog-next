/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  providerKey: string,
  userNickname: string,
  photoUrl?: string | null,
  email?: string | null,
};

export type ModelUserConditionInput = {
  providerKey?: ModelStringInput | null,
  userNickname?: ModelStringInput | null,
  photoUrl?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id?: string,
  providerKey?: string,
  userNickname?: string,
  photoUrl?: string | null,
  email?: string | null,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
  Posts?: ModelPostConnection,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id?: string,
  editorState?: string,
  titlePhoto?: string,
  title?: string,
  subTitle?: string,
  userId?: string,
  createdAt?: string,
  updatedAt?: string,
  owner?: string | null,
  tags?: ModelPostTagConnection,
};

export type ModelPostTagConnection = {
  __typename: "ModelPostTagConnection",
  items?:  Array<PostTag | null > | null,
  nextToken?: string | null,
};

export type PostTag = {
  __typename: "PostTag",
  id?: string,
  userId?: string,
  postId?: string,
  tagId?: string,
  createdAt?: string,
  updatedAt?: string,
  post?: Post,
  owner?: string | null,
  tag?: Tag,
};

export type Tag = {
  __typename: "Tag",
  id?: string,
  tagName?: string,
  createdAt?: string,
  updatedAt?: string,
  posts?: ModelPostTagConnection,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  providerKey?: string | null,
  userNickname?: string | null,
  photoUrl?: string | null,
  email?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreatePostInput = {
  id?: string | null,
  editorState: string,
  titlePhoto: string,
  title: string,
  subTitle: string,
  userId: string,
};

export type ModelPostConditionInput = {
  editorState?: ModelStringInput | null,
  titlePhoto?: ModelStringInput | null,
  title?: ModelStringInput | null,
  subTitle?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  editorState?: string | null,
  titlePhoto?: string | null,
  title?: string | null,
  subTitle?: string | null,
  userId?: string | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type CreatePostTagInput = {
  id?: string | null,
  userId: string,
  postId: string,
  tagId: string,
};

export type ModelPostTagConditionInput = {
  userId?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  tagId?: ModelIDInput | null,
  and?: Array< ModelPostTagConditionInput | null > | null,
  or?: Array< ModelPostTagConditionInput | null > | null,
  not?: ModelPostTagConditionInput | null,
};

export type UpdatePostTagInput = {
  id: string,
  userId?: string | null,
  postId?: string | null,
  tagId?: string | null,
};

export type DeletePostTagInput = {
  id?: string | null,
};

export type CreateTagInput = {
  id?: string | null,
  tagName: string,
};

export type ModelTagConditionInput = {
  tagName?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
};

export type UpdateTagInput = {
  id: string,
  tagName?: string | null,
};

export type DeleteTagInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  providerKey?: ModelStringInput | null,
  userNickname?: ModelStringInput | null,
  photoUrl?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items?:  Array<User | null > | null,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  editorState?: ModelStringInput | null,
  titlePhoto?: ModelStringInput | null,
  title?: ModelStringInput | null,
  subTitle?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostTagFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  tagId?: ModelIDInput | null,
  and?: Array< ModelPostTagFilterInput | null > | null,
  or?: Array< ModelPostTagFilterInput | null > | null,
  not?: ModelPostTagFilterInput | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  tagName?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items?:  Array<Tag | null > | null,
  nextToken?: string | null,
};

export type CreateUserMutationVariables = {
  input?: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input?: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input?: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input?: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreatePostTagMutationVariables = {
  input?: CreatePostTagInput,
  condition?: ModelPostTagConditionInput | null,
};

export type CreatePostTagMutation = {
  createPostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type UpdatePostTagMutationVariables = {
  input?: UpdatePostTagInput,
  condition?: ModelPostTagConditionInput | null,
};

export type UpdatePostTagMutation = {
  updatePostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type DeletePostTagMutationVariables = {
  input?: DeletePostTagInput,
  condition?: ModelPostTagConditionInput | null,
};

export type DeletePostTagMutation = {
  deletePostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type CreateTagMutationVariables = {
  input?: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type UpdateTagMutationVariables = {
  input?: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type DeleteTagMutationVariables = {
  input?: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      providerKey: string,
      userNickname: string,
      photoUrl?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      Posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type UserByProviderKeyQueryVariables = {
  providerKey?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByProviderKeyQuery = {
  userByProviderKey?:  {
    __typename: "ModelUserConnection",
    items?:  Array< {
      __typename: "User",
      id: string,
      providerKey: string,
      userNickname: string,
      photoUrl?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      Posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id?: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetPostTagQueryVariables = {
  id?: string,
};

export type GetPostTagQuery = {
  getPostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type ListPostTagsQueryVariables = {
  filter?: ModelPostTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostTagsQuery = {
  listPostTags?:  {
    __typename: "ModelPostTagConnection",
    items?:  Array< {
      __typename: "PostTag",
      id: string,
      userId: string,
      postId: string,
      tagId: string,
      createdAt: string,
      updatedAt: string,
      post:  {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      owner?: string | null,
      tag:  {
        __typename: "Tag",
        id: string,
        tagName: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items?:  Array< {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id?: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    providerKey: string,
    userNickname: string,
    photoUrl?: string | null,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    Posts?:  {
      __typename: "ModelPostConnection",
      items?:  Array< {
        __typename: "Post",
        id: string,
        editorState: string,
        titlePhoto: string,
        title: string,
        subTitle: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    editorState: string,
    titlePhoto: string,
    title: string,
    subTitle: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
    tags?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreatePostTagSubscription = {
  onCreatePostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type OnUpdatePostTagSubscription = {
  onUpdatePostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type OnDeletePostTagSubscription = {
  onDeletePostTag?:  {
    __typename: "PostTag",
    id: string,
    userId: string,
    postId: string,
    tagId: string,
    createdAt: string,
    updatedAt: string,
    post:  {
      __typename: "Post",
      id: string,
      editorState: string,
      titlePhoto: string,
      title: string,
      subTitle: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
      tags?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
    },
    owner?: string | null,
    tag:  {
      __typename: "Tag",
      id: string,
      tagName: string,
      createdAt: string,
      updatedAt: string,
      posts?:  {
        __typename: "ModelPostTagConnection",
        nextToken?: string | null,
      } | null,
      owner?: string | null,
    },
  } | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    tagName: string,
    createdAt: string,
    updatedAt: string,
    posts?:  {
      __typename: "ModelPostTagConnection",
      items?:  Array< {
        __typename: "PostTag",
        id: string,
        userId: string,
        postId: string,
        tagId: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    owner?: string | null,
  } | null,
};
