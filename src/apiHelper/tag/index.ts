import { API } from 'aws-amplify';

import {
  listPostTags,
  tagByTagName,
  postTagsByPostIdAndTagId,
  getTag,
} from '@/graphql/queries';
import {
  createTag,
  createPostTag,
  deletePostTag,
  deleteTag,
} from '@/graphql/mutations';

export const getTagsByPostId = async ({ postId }) => {
  // List Current Post's Tags
  const tagPostsInDatabaseRes = await API.graphql({
    query: listPostTags,
    variables: { filter: { postId: { eq: postId } } },
  });
  const tagsInDatabase =
    tagPostsInDatabaseRes.data.listPostTags.items.map((item) => item.tag) ?? [];

  return tagsInDatabase;
};

export const createAndLinkNewTag = async ({
  tags,
  postTagsInDB,
  postId,
  userId,
}) => {
  const isAleardyInPostDB = (tag) =>
    postTagsInDB.find((tagInDB) => tagInDB.tagName === tag);

  for (const tag of tags) {
    if (!isAleardyInPostDB(tag)) {
      const tagByTagNameRes = await API.graphql({
        query: tagByTagName,
        variables: { baseType: 'Tag', tagName: { eq: tag } },
      });
      const tagsByTagName = tagByTagNameRes.data.tagByTagName.items;
      const isAlreadyInDB =
        tagsByTagName && tagsByTagName.length && tagsByTagName.length !== 0;
      let tagId;
      // create Tag if not on all DB or link with exist one
      if (!isAlreadyInDB) {
        const createTagRes = await API.graphql({
          query: createTag,
          variables: { input: { tagName: tag, baseType: 'Tag' } },
        });
        tagId = createTagRes.data.createTag.id;
      } else {
        tagId = tagsByTagName[0].id;
      }

      await API.graphql({
        query: createPostTag,
        variables: { input: { postId, tagId, userId, baseType: 'PostTag' } },
      });
    }
  }
};

export const deleteAndUnLinkLegacyTag = async ({
  tags,
  postTagsInDB,
  postId,
}) => {
  const isTagNeedDeleted = (tagDB) =>
    !tags.find((tag) => tag === tagDB.tagName);

  //  Delete Tag not exist now but exist in DB
  for (const tagDB of postTagsInDB) {
    if (isTagNeedDeleted(tagDB)) {
      // Get connection
      const postTagOnPostRes = await API.graphql({
        query: postTagsByPostIdAndTagId,

        variables: {
          baseType: 'PostTag',
          postIdTagId: { eq: { postId, tagId: tagDB.id } },
        },
      });
      console.log(`tagDB`, tagDB);
      console.log(`postTagOnPostRes`, postTagOnPostRes);

      const postTagId =
        postTagOnPostRes.data.postTagsByPostIdAndTagId.items[0].id ?? null;

      // Delete connection
      await API.graphql({
        query: deletePostTag,
        variables: {
          input: { id: postTagId },
        },
      });

      const tagRes = await API.graphql({
        query: getTag,
        variables: {
          id: tagDB.id,
        },
      });

      console.log(`tagRes`, tagRes);

      const noMoreLinkdPost =
        tagRes?.data?.getTag?.postTags?.items?.length === 0;

      // Delete Tag
      if (noMoreLinkdPost) {
        await API.graphql({
          query: deleteTag,
          variables: { input: { id: tagDB.id } },
        });
      }
    }
  }
};
