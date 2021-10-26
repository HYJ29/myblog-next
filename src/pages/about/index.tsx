import React, { useEffect } from 'react';
import Image from 'next/image';
import Fade from 'react-reveal/Fade';

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
      <section className={styles.sectionContainer_1}>
        {/* <Fade>
          <div className={styles.profileImageContainer}>
            <Image
              src={'/images/grandCanyon.jpeg'}
              layout="fill"
              objectFit="cover"
              className={styles.profileImage}
              placeholder="blur"
            />
          </div>
        </Fade> */}
        <Fade top>
          <h3>I love being service developer.</h3>
          <h3>Who can deploy awesome ideas to the world.</h3>
          <h3>I love to join project with mind of owner.</h3>
          <h3>I love riding bycicles around 'Han' river.</h3>
          <h3>I love running in the morning with music on my aftershock.</h3>
        </Fade>
      </section>
      <section className={styles.sectionContainer_2}>
        <Fade top>
          <ul className={styles.postListContainer}>about</ul>
        </Fade>
      </section>
      <section className={styles.sectionContainer_3}>
        <Fade top>
          <ul className={styles.postListContainer}>about</ul>
        </Fade>
      </section>
    </DefaultLayout>
  );
}
