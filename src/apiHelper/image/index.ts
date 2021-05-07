import { Storage, API } from 'aws-amplify';
import { v4 as uuidV4 } from 'uuid';

import {
  createImage,
  deletePostImage,
  deleteImage,
  createPostImage,
  updateImage,
  createDraftImage,
  deleteDraftImage,
} from '@/graphql/mutations';
import {
  listImages,
  postImageByPostIdAndImageId,
  listPostImages,
  listDraftImages,
  draftImageByDraftIdAndImageId,
} from '@/graphql/queries';

import awsConfig from '@/aws-exports';
const { aws_user_files_s3_bucket, aws_user_files_s3_bucket_region } = awsConfig;

export const uploadIamgeS3AndDB = async ({ file, userId }) => {
  const imageUniqueKey = uuidV4();
  // Upload Iamge to S3
  const s3Object = await Storage.put(imageUniqueKey, file, {
    contentType: 'image/jpeg',
    acl: 'public-read',
  });
  const imageS3Key = s3Object.key;
  const signedUrl = await Storage.get(imageS3Key);
  const accessUrl = `https://${aws_user_files_s3_bucket}.s3.${aws_user_files_s3_bucket_region}.amazonaws.com/public/${imageS3Key}`;

  // Create Image
  const createImageRes = await API.graphql({
    query: createImage,
    variables: {
      input: {
        baseType: 'Image',
        url: accessUrl,
        imageKey: imageS3Key,
        isPublished: false,
        isSaved: false,
        userId: userId,
      },
    },
  });

  const imageDbId = createImageRes.data.createImage.id;

  return { imageDbId, imageS3Key, accessUrl };
};

export const trimImageS3AndDB = async ({ postId, images, userId }) => {
  const imageKeys = images.map((image) => image.data.imageKey);

  let imagesOfThisPostOnDB = [];

  // Get PostImages on this Post
  const postImagesDBRes = await API.graphql({
    query: listPostImages,
    variables: { filter: { postId: { eq: postId } } },
  });
  const postImageDB = postImagesDBRes?.data?.listPostImages?.items ?? [];

  if (postImageDB.length === 0) {
    // Get DB images not published, not saved
    const listImagesRes = await API.graphql({
      query: listImages,
      variables: {
        filter: {
          isPublished: { eq: false },
          isSaved: { eq: false },
          userId: { eq: userId },
        },
      },
    });
    imagesOfThisPostOnDB = listImagesRes.data.listImages.items;
  } else {
    imagesOfThisPostOnDB = postImageDB;
  }

  const imagesToDelete = imagesOfThisPostOnDB.filter(
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

export const trimImageS3AndDBDraft = async ({ draftId, images, userId }) => {
  const imageKeys = images.map((image) => image.data.imageKey);

  let imagesOfThisDraftOnDB = [];

  // Get DraftImages on this Post
  const draftImagesDBRes = await API.graphql({
    query: listDraftImages,
    variables: { filter: { draftId: { eq: draftId } } },
  });
  const draftImageDB = draftImagesDBRes?.data?.listPostImages?.items ?? [];

  if (draftImageDB.length === 0) {
    // Get DB images not published, not saved
    const listImagesRes = await API.graphql({
      query: listImages,
      variables: {
        filter: {
          isPublished: { eq: false },
          isSaved: { eq: false },
          userId: { eq: userId },
        },
      },
    });
    imagesOfThisDraftOnDB = listImagesRes.data.listImages.items;
  } else {
    imagesOfThisDraftOnDB = draftImageDB;
  }

  const imagesToDelete = imagesOfThisDraftOnDB.filter(
    (imageDB) => !imageKeys.find((imageKey) => imageKey === imageDB.imageKey)
  );

  //  Delete Image on S3 and DB if not exist now
  for (const imageToDelete of imagesToDelete) {
    // Delete connection
    const draftImageRes = await API.graphql({
      query: draftImageByDraftIdAndImageId,
      variables: { draftId, imageId: { eq: imageToDelete.id } },
    });
    const darftImageId =
      draftImageRes?.data?.draftImageByDraftIdAndImageId?.items[0]?.id ?? null;
    if (darftImageId) {
      await API.graphql({
        query: deletePostImage,
        variables: { input: { id: darftImageId } },
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
  const postImagesDB = postImagesDBRes?.data?.listPostImages?.items ?? [];

  // Create Image Mapping if not mapped already
  for (const image of images) {
    const isMapedDBAlready = !!postImagesDB.find(
      (postImage) => postImage.imageId === image.data.imageDbId
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

      // Update image isPublished, isDraft
      const updateImageRes = await API.graphql({
        query: updateImage,
        variables: {
          input: {
            id: image.data.imageDbId,
            isPublished: true,
            isSaved: false,
          },
        },
      });
      console.log(`updateImageRes`, updateImageRes);
      console.log(`createPostImageRes`, createPostImageRes);
    }
  }
};

export const mapDraftAndIamges = async ({ draftId, userId, images }) => {
  // Get PostImages on this Post

  const draftImagesDBRes = await API.graphql({
    query: listDraftImages,
    variables: { filter: { draftId: { eq: draftId } } },
  });

  const draftImagesDB = draftImagesDBRes?.data?.listDraftImages?.items ?? [];

  console.log(`draftImageDB`, draftImagesDB);

  // Create Image Mapping if not mapped already
  for (const image of images) {
    console.log(`image`, image);
    const isMapedDBAlready = !!draftImagesDB.find(
      (draftImage) => draftImage.imageId === image.data.imageDbId
    );
    if (!isMapedDBAlready) {
      const createDraftImageRes = await API.graphql({
        query: createDraftImage,
        variables: {
          input: {
            draftId,
            userId,
            imageId: image.data.imageDbId,
            baseType: 'DraftImage',
          },
        },
      });

      // Update image isPublished, isSaved
      const updateImageRes = await API.graphql({
        query: updateImage,
        variables: {
          input: {
            id: image.data.imageDbId,
            isPublished: false,
            isSaved: true,
          },
        },
      });
      console.log(`updateImageRes`, updateImageRes);
      console.log(`createDraftImageRes`, createDraftImageRes);
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

export const deleteDraftImageLink = async ({ draftImagesToDelete }) => {
  for (const draftImage of draftImagesToDelete) {
    const deleteDraftImageRes = await API.graphql({
      query: deleteDraftImage,
      variables: { input: { id: draftImage.id } },
    });
    console.log(`deleteDraftImageRes`, deleteDraftImageRes);
  }
};
