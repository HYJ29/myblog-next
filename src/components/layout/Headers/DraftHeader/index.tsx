import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API, Storage } from 'aws-amplify';
import { difference } from 'lodash';

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
  createPost,
  createTag,
  createPostTag,
  deleteTag,
  deletePostTag,
  deleteImage,
  createPostImage,
  deletePostImage,
  createDraft,
  updateDraft,
} from '@/graphql/mutations';

import { AuthContext } from '@/pages/_app';
import { tag, image } from '@/apiHelper';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function DraftHeader({ editorState, draftId, userId }) {
  const router = useRouter();
  const { Modal, setShowModal } = useModal();

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
  console.log(`images`, images);

  const onPublishHandler = async () => {
    const res = await API.graphql({
      query: createPost,
      variables: {
        input: {
          rawContentState: rawJsonContentState,
          titlePhoto,
          title,
          subTitle,
          userId,
          baseType: 'Post',
        },
      },
    });

    const post = res.data.createPost;

    const postId = post.id;

    const postTagsInDB = await tag.getTagsByPostId({ postId });

    await tag.createAndLinkNewTag({ tags, postTagsInDB, userId, postId });

    await tag.deleteAndUnLinkLegacyTag({ tags, postTagsInDB, postId });

    await image.trimImageS3AndDB({ postId, images, userId });

    await image.mapPostAndIamges({ postId, userId, images });

    return postId;
  };

  const onSaveHandler = async () => {
    const updateDraftRes = await API.graphql({
      query: updateDraft,
      variables: {
        input: {
          id: draftId,
          rawContentState: rawJsonContentState,
          titlePhoto,
          title,
          subTitle,
          userId,
          baseType: 'Draft',
        },
      },
    });

    await image.trimImageS3AndDBDraft({ draftId, images, userId });
    await image.mapDraftAndIamges({ draftId, userId, images });

    return draftId;
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
            const postId = await onPublishHandler();
            router.push(`/post/${postId}`);
          }}
        >
          Publish
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
          text="Save"
          onClick={async () => {
            const draftId = await onSaveHandler();
            router.push(`/draft/${draftId}`);
          }}
        />
        <ControllerItem
          text="Publish"
          onClick={async () => {
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
