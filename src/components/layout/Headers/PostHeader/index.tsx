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
import { deletePost } from '@/graphql/mutations';
import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function PostHeader({ editorState, owner, postId }) {
  const router = useRouter();
  const { Modal, setShowModal } = useModal();
  const { authState } = useContext(AuthContext);
  const { auth } = authState;
  const username = auth.username;

  const isUserOwnerOfPost = username === owner;

  const rawJsonContentState = getRawJsonContentStateFrom({ editorState });
  const titlePhoto = getTitlePhtoFromEditorState({ editorState });
  const {
    titleText: title,
    subTitleText: subTitle,
  } = getPostInfoFromEditorState({
    editorState,
  });
  const tags = getTagsFromEditorState({ editorState });

  const onEditHandler = async () => {};

  const onDeleteHandler = async () => {
    setShowModal(true);
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
          <span className={styles.modalBodyText}>
            Are you sure to delete this Post?
          </span>
        </div>
        <Button
          style={{ width: 100, alignSelf: 'center', marginTop: '1rem' }}
          onClick={async () => {
            setShowModal(false);
            await API.graphql({
              query: deletePost,
              variables: { input: { id: postId } },
            });
          }}
        >
          DELETE
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
      {isUserOwnerOfPost && (
        <ul className={styles.navigationContainer}>
          <ControllerItem text="Edit" onClick={onEditHandler} />
          <ControllerItem text="Delete" onClick={onDeleteHandler} />
        </ul>
      )}

      <Modal>
        <ModalContent />
      </Modal>
    </header>
  );
}
