import React, { useEffect, useState } from 'react';

import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { withSSRContext, API, Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

import { DefaultLayout } from '@/components/layout';
import { Card } from '@/components/ui';
import { XCircle } from '@/components/icons';
import { useModal, useLoadingModal } from '@/hooks';

import styles from './style.module.scss';
import { userByProviderKey, getUser } from '@/graphql/queries';
import { deleteDraft, deleteDraftImage } from '@/graphql/mutations';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { Modal, setShowModal } = useModal();
  const { LoadingModal, setShowLoadingModal } = useLoadingModal();

  useEffect(() => {
    (async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        if (cognitoUser) {
          const providerKey = cognitoUser.username;
          const userOfProviderKey = await API.graphql({
            query: userByProviderKey,
            variables: {
              providerKey,
            },
          });
          const dbUserId =
            userOfProviderKey.data.userByProviderKey?.items[0].id ?? null;

          const getUserRes = await API.graphql({
            query: getUser,
            variables: { id: dbUserId },
          });

          const dbUser = getUserRes.data.getUser;
          setUser(dbUser);
        }
      } catch (e) {
        router.push('/auth');
      }
    })();
  }, []);

  const deleteDraftHandler = async (draft) => {
    setShowLoadingModal({ text: 'DELETING DRAFT' });
    const draftId = draft.id;

    // deleteDraft
    const deleteDraftRes = await API.graphql({
      query: deleteDraft,
      variables: { input: { id: draftId } },
    });
    const ImagesOfDeletedDraft =
      deleteDraftRes.data.deleteDraft.draftImages.items ?? [];

    // delete draftIamge connections
    for (const draftImage of ImagesOfDeletedDraft) {
      const draftImageId = draftImage.id;
      await API.graphql({
        query: deleteDraftImage,
        variables: { input: { id: draftImageId } },
      });
    }

    const getUserRes = await API.graphql({
      query: getUser,
      variables: { id: user.id },
    });
    const newUser = getUserRes.data.getUser;
    setUser(newUser);
    setShowLoadingModal(false);
  };

  return (
    <DefaultLayout>
      {user ? (
        <div className={styles.container}>
          {user && <div>Hi! {user.userNickname}</div>}
          <AmplifySignOut
            handleAuthStateChange={(nextAuthState, data) => {
              if (nextAuthState === AuthState.SignedOut) {
                router.push('/auth');
              }
            }}
          />
          <h3>Your Drafts</h3>

          <ul className={styles.postsContainer}>
            {user.Drafts.items.map((draft) => (
              <div className={styles.draftItem}>
                <Card
                  key={draft.id}
                  linkTo={`/draft/${draft.id}`}
                  titlePhoto={draft.titlePhoto}
                  title={draft.title}
                  subTitle={draft.subTitle}
                  createdAt={draft.createdAt}
                />
                <div
                  className={styles.modalXIcon}
                  onClick={() =>
                    setShowModal({
                      content: <div>ARE YOU SURE TO DELETE ?</div>,
                      buttonText: 'YES DELETE',
                      onButtonClick: () => deleteDraftHandler(draft),
                    })
                  }
                >
                  <XCircle />
                </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
      <Modal />
      <LoadingModal />
    </DefaultLayout>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const { Auth, API } = withSSRContext({ req });
//   let dbUser = {};
//   try {
//     const cognitoUser = await Auth.currentAuthenticatedUser();
//     if (cognitoUser) {
//       const providerKey = cognitoUser.username;
//       const userOfProviderKey = await API.graphql({
//         query: userByProviderKey,
//         variables: {
//           providerKey,
//         },
//       });
//       const dbUserId =
//         userOfProviderKey.data.userByProviderKey?.items[0].id ?? null;

//       const getUserRes = await API.graphql({
//         query: getUser,
//         variables: { id: dbUserId },
//       });

//       dbUser = getUserRes.data.getUser;
//     }

//     return {
//       props: {
//         user: dbUser,
//       },
//     };
//   } catch (e) {
//     console.log(`Error on Profile serverSide `, e);
//     res.writeHead(302, { Location: '/auth' });
//     res.end();
//   }
// }
