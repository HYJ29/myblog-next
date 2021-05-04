import { Storage, API } from 'aws-amplify';
import { v4 as uuidV4 } from 'uuid';

import {
  createImage,
  deletePostImage,
  deleteImage,
  createPostImage,
} from '@/graphql/mutations';
import {
  listImages,
  postImageByPostIdAndImageId,
  listPostImages,
} from '@/graphql/queries';

export const uploadIamgeS3AndDB = async ({ file }) => {
  const imageUniqueKey = uuidV4();
  // Upload Iamge to S3
  const s3Object = await Storage.put(imageUniqueKey, file, {
    contentType: 'image/jpeg',
    acl: 'public-read',
  });
  const imageS3Key = s3Object.key;
  const signedUrl = await Storage.get(imageS3Key);

  // Create Image
  const createImageRes = await API.graphql({
    query: createImage,
    variables: {
      input: {
        baseType: 'Image',
        url: signedUrl,
        imageKey: imageS3Key,
        isPublished: false,
      },
    },
  });

  const imageDbId = createImageRes.data.createImage.id;

  return { imageDbId, imageS3Key, signedUrl };
};

export const trimImageS3AndDB = async ({ postId, images }) => {
  const imageKeys = images.map((image) => image.data.imageKey);

  // Get DB images
  const listImagesRes = await API.graphql({
    query: listImages,
    variables: {
      filter: { isPublished: { eq: false } },
    },
  });
  const draftImagesDB = listImagesRes.data.listImages.items;
  const imagesToDelete = draftImagesDB.filter(
    (imageDB) => !imageKeys.find((imageKey) => imageKey === imageDB.imageKey)
  );

  //  Delete Image on S3 and DB if not exist now
  for (const imageToDelete of imagesToDelete) {
    // Delete connection
    const postImageRes = await API.graphql({
      query: postImageByPostIdAndImageId,
      variables: { postId, imageId: { eq: imageToDelete.id } },
    });
    const postImageId =
      postImageRes?.data?.postImageByPostIdAndImageId?.items[0]?.id ?? null;
    if (postImageId) {
      await API.graphql({
        query: deletePostImage,
        variables: { input: { id: postImageId } },
      });
    }
    // Delete image on DB
    const deletedRes = await API.graphql({
      query: deleteImage,
      variables: { input: { id: imageToDelete.id } },
    });

    // Delete Image on S3
    const delRes = await Storage.remove(imageToDelete.imageKey);
  }
};

export const mapPostAndIamges = async ({ postId, userId, images }) => {
  // Get PostImages on this Post
  const postImagesDBRes = await API.graphql({
    query: listPostImages,
    variables: { filter: { postId: { eq: postId } } },
  });
  const postImageDB = postImagesDBRes?.data?.listPostTags?.items ?? [];

  // Create Image Mapping if not mapped already
  for (const image of images) {
    const isMapedDBAlready = !!postImageDB.find(
      (imageDB) => imageDB.id === image.data.imageDbId
    );
    if (!isMapedDBAlready) {
      const createPostImageRes = await API.graphql({
        query: createPostImage,
        variables: {
          input: {
            postId,
            userId,
            imageId: image.data.imageDbId,
            baseType: 'PostImage',
          },
        },
      });

      console.log(`createPostImageRes`, createPostImageRes);
    }
  }
};

export const deleteImageS3AndDB = async ({ post }) => {
  // Delete Post Images
  const postImages = post.postImages.items;
  for (const postImage of postImages) {
    // Delete connection
    const deletePostImageRes = await API.graphql({
      query: deletePostImage,
      variables: { input: { id: postImage.id } },
    });

    const deletedLinkImage = deletePostImageRes.data.deletePostImage.image;

    // If There is no more linked post delete image
    // get PostImage link with deleted imagelink
    const listPostImagesRes = await API.graphql({
      query: listPostImages,
      variables: { filter: { imageId: { eq: deletedLinkImage.id } } },
    });
    const isNoMorePostWithThisImage =
      listPostImagesRes.data.listPostImages.items?.length === 0;
    if (isNoMorePostWithThisImage) {
      // Delete image on DB
      const dbImageDeleteRes = await API.graphql({
        query: deleteImage,
        variables: { input: { id: deletedLinkImage.id } },
      });

      // Delete Image on S3
      const storageDeleteRes = await Storage.remove(deletedLinkImage.imageKey);
    }
  }
};
