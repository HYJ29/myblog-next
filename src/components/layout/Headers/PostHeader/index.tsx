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
} from '@/utils/draft/filter';
import {
  deletePost,
  deletePostTag,
  deletePostImage,
  deleteTag,
  deleteImage,
} from '@/graphql/mutations';
import { AuthContext } from '@/pages/_app';
import { tag } from '@/apiHelper';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function PostHeader({ editorState, owner, post }) {
  const router = useRouter();
  const { Modal, setShowModal } = useModal();
  const { authState } = useContext(AuthContext);
  const { auth } = authState;
  const username = auth.username;
  const postId = post.id;

  console.log(`post`, post);

  const isUserOwnerOfPost = username === owner;

  const onEditHandler = async () => {
    router.push(`/post/edit/${postId}`);
  };

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
            const postTagsInDB = await tag.getTagsByPostId({ postId });
            console.log(`postTagsInDB`, postTagsInDB);
            await tag.deleteAndUnLinkLegacyTag({
              tags: [],
              postTagsInDB,
              postId,
            });

            // Delete Post
            await API.graphql({
              query: deletePost,
              variables: { input: { id: postId } },
            });

            // // Delete Post Tags
            // const postTags = post.postTags.items;
            // for (const postTag of postTags) {
            //   const deletePostTagRes = await API.graphql({
            //     query: deletePostTag,
            //     variables: { input: { id: postTag.id } },
            //   });
            //   console.log(`deletePostTagRes`, deletePostTagRes);
            //   const deletedLinkTag = deletePostTagRes.data.deletePostTag.tag;

            //   //  If there is no more linked post delete tag
            //   console.log(`deletedLinkTag`, deletedLinkTag);
            //   if (deletedLinkTag.postTags.nextToken === null) {
            //     const deletedTagRes = await API.graphql({
            //       query: deleteTag,
            //       variables: { input: { id: deletedLinkTag.id } },
            //     });
            //     console.log(`deletedTagRes`, deletedTagRes);
            //   }
            // }

            // Delete Post Images
            const postImages = post.postImages.items;
            for (const postImage of postImages) {
              const deletePostImageRes = await API.graphql({
                query: deletePostImage,
                variables: { input: { id: postImage.id } },
              });
              console.log(`deletePostImageRes`, deletePostImageRes);
              const deletedLinkImage =
                deletePostImageRes.data.deletePostImage.image;
              // If There is no more linked post delete image
              if (deletedLinkImage.postImage.nextToken === null) {
                const storageDeleteRes = await Storage.remove(
                  deletedLinkImage.imageKey
                );
                console.log(`storageDeleteRes`, storageDeleteRes);
                const dbImageDeleteRes = await API.graphql({
                  query: deleteImage,
                  variables: { input: { id: deletedLinkImage.id } },
                });
                console.log(`dbImageDeleteRes`, dbImageDeleteRes);
              }
            }
            router.push('/');
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
          <ControllerItem key="edit" text="Edit" onClick={onEditHandler} />
          <ControllerItem
            key="delete"
            text="Delete"
            onClick={onDeleteHandler}
          />
        </ul>
      )}

      <Modal>
        <ModalContent />
      </Modal>
    </header>
  );
}
