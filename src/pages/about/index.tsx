import React, { useEffect } from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';
import Lottie from 'react-lottie';

import byyoungjinLineAnimation from 'assets/lottie/byyoungjin-line-animation.json';

import { DefaultLayout } from '@/components/layout';
import styles from './style.module.scss';

export default function AboutPage() {
  // useEffect(() => {
  //   window.addEventListener('scroll', (e) => {
  //     console.log('e', JSON.stringify(e, null, 2));
  //   });
  // }, []);
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <section className={styles.sectionContainer_0}>
          <div className={styles.lottieContainer}>
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: byyoungjinLineAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              isStoped={false}
              isFaused={false}
            />
          </div>
        </section>
        <section className={styles.sectionContainer_1}>
          <Fade top>
            <h3>I love being service developer,</h3>
            <h3>who can deploy awesome ideas to the world.</h3>
          </Fade>
        </section>
        <section className={styles.sectionContainer_2}>
          <Fade top>
            <h3>I love to join challenging projects.</h3>
          </Fade>
        </section>
        <section className={styles.sectionContainer_3}>
          <Fade top>
            <h3>I love riding bicycle around 'Han' river.</h3>
            <h3>I love running in the morning with music on my aftershock.</h3>
          </Fade>
        </section>
      </div>
    </DefaultLayout>
  );
}
