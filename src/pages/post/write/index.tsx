import React from 'react';
import { withSSRContext } from 'aws-amplify';
import { Editor } from '@/components/editor';
import { WriteLayout } from '@/components/layout';

export default function PostWritePage() {
  // TODO : local storage 에 editorState 있으면 hydrate 하기

  return <WriteLayout Editor={Editor} />;
}

// export async function getServerSideProps({ req, res }) {
//   const { Auth, API } = withSSRContext({ req });

//   try {
//     const cognitoUser = await Auth.currentAuthenticatedUser();

//     return {
//       props: {},
//     };
//   } catch (e) {
//     console.log(`Error on Profile serverSide `, e);
//     res.writeHead(302, { Location: '/auth' });
//     res.end();
//   }
// }
