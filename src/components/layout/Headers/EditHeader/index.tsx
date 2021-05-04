import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API, Storage } from 'aws-amplify';

import { useModal } from '@/hooks/useModal';
import { XCircle } from '@/components/icons';
import { Button } from '@/components/button';
import { getRawJsonContentStateFrom } from '@/utils/draft/convert';
import {
  getTitlePhtoFromEditorState,
  getPostInfoFromEditorState,
  getTagsFromEditorState,
  getImagesFromEditorState,
} from '@/utils/draft/filter';
import {
  updatePost,
  createTag,
  createPostTag,
  deleteTag,
  deletePostTag,
  deletePostImage,
  deleteImage,
  createPostImage,
} from '@/graphql/mutations';
import {
  listTags,
  postTagsByPostIdAndTagId,
  listPostTags,
  listImages,
  listPostImages,
  postImageByPostIdAndImageId,
  tagByTagName,
  getTag,
} from '@/graphql/queries';
import { AuthContext } from '@/pages/_app';
import { tag } from '@/apiHelper';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function EditHeader({ editorState, postId }) {
  const router = useRouter();
  const { Modal, setShowModal } = useModal();
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const { id: userId } = user;

  const rawJsonContentState = getRawJsonContentStateFrom({ editorState });
  const titlePhoto = getTitlePhtoFromEditorState({ editorState });
  const {
    titleText: title,
    subTitleText: subTitle,
  } = getPostInfoFromEditorState({
    editorState,
  });
  const tags = getTagsFromEditorState({ editorState });

  const images = getImagesFromEditorState({ editorState });
  const imageKeys = images.map((image) => image.data.imageKey);

  const onEditHandler = async () => {
    const res = await API.graphql({
      query: updatePost,
      variables: {
        input: {
          id: postId,
          rawContentState: rawJsonContentState,
          titlePhoto,
          title,
          subTitle,
          userId: user.id,
          baseType: 'Post',
        },
      },
    });

    const editedPost = res.data.updatePost;

    const editedPostId = editedPost.id;

    const postTagsInDB = await tag.getTagsByPostId({ postId });

    await tag.createAndLinkNewTag({ tags, postTagsInDB, userId, postId });

    await tag.deleteAndUnLinkLegacyTag({ tags, postTagsInDB, postId });

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
      const delRes = await Storage.remove(imageToDelete.imageKey);
      console.log(`delRes`, delRes);

      // Delete connection
      const postImageRes = await API.graphql({
        query: postImageByPostIdAndImageId,
        variables: { postId, imageId: { eq: imageToDelete.id } },
      });
      const postImageId =
        postImageRes?.data?.postImageByPostIdAndImageId?.items[0].id ?? null;
      if (postImageId) {
        await API.graphql({
          query: deletePostImage,
          variables: { input: { id: postImageId } },
        });
      }

      const deletedRes = await API.graphql({
        query: deleteImage,
        variables: { input: { id: imageToDelete.id } },
      });
      console.log(`deletedDBRes`, deletedRes);
    }

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

    return editedPostId;
  };

  const ModalContent = () => {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div
            className={styles.modalXIcon}
            onClick={() => setShowModal(false)}
          >
            <XCircle />
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.infoTextContainer}>
            <h4 className={styles.modalLabel}>Title</h4>
            <h3 className={styles.modalTitle}>{title}.</h3>
          </div>

          <div className={styles.infoTextContainer}>
            <h4 className={styles.modalLabel}>Subtitle</h4>
            <h3 className={styles.modalSubTitle}>{subTitle}</h3>
          </div>
          <div className={styles.tagContainer}>
            {tags.map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
          <img className={styles.titlePhoto} src={titlePhoto} />
        </div>
        <Button
          style={{ width: 100, alignSelf: 'center', marginTop: '1rem' }}
          onClick={async () => {
            setShowModal(false);
            const postId = await onEditHandler();
            router.push(`/post/${postId}`);
          }}
        >
          Publish Again
        </Button>
      </div>
    );
  };

  return (
    <header className={styles.container}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <img
            alt="logo"
            src={'/images/logo.svg'}
            className={styles.logoImage}
          />
        </div>
      </Link>
      <ul className={styles.navigationContainer}>
        <ControllerItem
          text="Confirm Edit"
          onClick={() => {
            setShowModal(true);
          }}
        />
      </ul>
      <Modal>
        <ModalContent />
      </Modal>
    </header>
  );
}
