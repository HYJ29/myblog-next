import { useEffect, useState } from 'react';

import { Auth } from 'aws-amplify';

export const useWhoAmI = () => {
  const [user, setUser] = useState('notAsked');
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) {
          setUser(user);
        }
      })
      .catch((e) => setUser('noAuth'));
  }, []);
  return { user };
};
