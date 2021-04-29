import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API } from 'aws-amplify';

import { useModal } from '@/hooks/useModal';
import { XCircle } from '@/components/icons';
import { Button } from '@/components/button';
import { getRawJsonContentStateFrom } from '@/utils/draft/convert';
import {
  getTitlePhtoFromEditorState,
  getPostInfoFromEditorState,
  getTagsFromEditorState,
} from '@/utils/draft/filter';
import { updatePost } from '@/graphql/mutations';
import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function EditHeader({ editorState, postId }) {
  const router = useRouter();
  const { Modal, setShowModal } = useModal();
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const rawJsonContentState = getRawJsonContentStateFrom({ editorState });
  const titlePhoto = getTitlePhtoFromEditorState({ editorState });
  const {
    titleText: title,
    subTitleText: subTitle,
  } = getPostInfoFromEditorState({
    editorState,
  });
  const tags = getTagsFromEditorState({ editorState });

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
              <div className={styles.tag}>{tag}</div>
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
