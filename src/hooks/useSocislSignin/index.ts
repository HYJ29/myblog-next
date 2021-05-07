import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

export const useSocialSignin = ({ provider }) => {
  const Status = {
    notStarted: 'NOT_STARTED',
    started: 'STARTED',
    federatedSignin: 'FEDERATED_SIGNIN',
    databaseSignin: 'DATABASE_SIGNIN',
    finished: 'FINISHED',
    failed: 'FAILED',
  };

  const [isTriggeredSignin, setIsTriggeredSignin] = useState(false);
  const [signinStatus, setSigninStatus] = useState(Status.notStarted);
  let resolveDatebaseSignin;

  const databaseSignin = async () => {
    await new Promise((resolve, reject) => {
      resolveDatebaseSignin = resolve;
    });
  };

  const signinSequence = async () => {
    try {
      setSigninStatus(Status.started);
      setSigninStatus(Status.federatedSignin);
      await Auth.federatedSignIn({
        provider,
        customState: 'googleSignIn',
      });

      // const user = await Auth.currentAuthenticatedUser();
      // console.log(`user`, user);
      setSigninStatus(Status.databaseSignin);
      const resolved = await databaseSignin();
      console.log(`resolved`, resolved);
      setSigninStatus(Status.finished);
    } catch (e) {
      console.log(`e`, e);
      setSigninStatus(Status.failed);
    }
  };

  useEffect(() => {
    if (isTriggeredSignin) {
      signinSequence();
    }
  }, [isTriggeredSignin]);

  return { setIsTriggeredSignin, resolveDatebaseSignin, signinStatus, Status };
};
