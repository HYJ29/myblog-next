import API, { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

import { postByCreatedAt, listPostTags } from '@/graphql/queries';
import { ModelSortDirection } from '@/API';

export const getAllPosts = async () => {
  const postRes = await API.graphql({
    query: postByCreatedAt,
    variables: {
      baseType: 'Post',
      sortDirection: ModelSortDirection.DESC,
    },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  });

  const posts = postRes.data.postByCreatedAt.items;

  return posts;
};

export const getPostByTags = async ({ tagId }) => {
  const postTagRes = await API.graphql({
    query: listPostTags,
    variables: { filter: { tagId: { eq: tagId } } },
  });
  // TODO : sort post with grapqhql index key
  const posts = postTagRes.data.listPostTags.items
    .map((item) => item.post)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  return posts;
};
