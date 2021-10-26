import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Auth } from 'aws-amplify';

import Menu from 'assets/icons/menu.svg';
import colors from '@/styles/colors.module.scss';

import styles from './style.module.scss';

import NavigationItem from '../Items/NavigationItem';
import { transform } from 'lodash';

export default function MainHeader() {
  const router = useRouter();
  const { pathname } = router;
  const [user, setUser] = useState();
  const [showSideNavBar, setShowSideNavBar] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
    });
  }, []);

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
        <li className={styles.navigationItem}>
          <NavigationItem text="HOME" route="/" pathname={pathname} />
        </li>
        <li className={styles.navigationItem}>
          <NavigationItem text="ABOUT" route="/about" pathname={pathname} />
        </li>

        {!user && (
          <li className={styles.navigationItem}>
            <NavigationItem
              text="WHO ARE YOU"
              route="/auth"
              pathname={pathname}
            />
          </li>
        )}
        {user && (
          <li className={styles.navigationItem}>
            <NavigationItem
              text="PROFILE"
              route="/profile"
              pathname={pathname}
            />
          </li>
        )}
        {user && (
          <li className={styles.navigationItem}>
            <NavigationItem
              text="WRITE"
              route="/post/write"
              pathname={pathname}
            />
          </li>
        )}
      </ul>
      <div className={styles.mobileSideBlockContainer}>
        <button
          className={styles.mobileMenuButton}
          onClick={() => {
            setShowSideNavBar((prev) => !prev);
          }}
        >
          <Menu width="24px" height="24px" fill={colors.colorPrimary500} />
        </button>

        <nav
          className={styles.sideNavigation}
          style={{
            transform: showSideNavBar ? `translate(0)` : `translate(200px)`,
          }}
        >
          <ul className={styles.mobileNavigationContainer}>
            <li className={styles.navigationItemMobile}>
              <NavigationItem text="HOME" route="/" pathname={pathname} />
            </li>
            <li className={styles.navigationItemMobile}>
              <NavigationItem text="ABOUT" route="/about" pathname={pathname} />
            </li>

            {!user && (
              <li className={styles.navigationItemMobile}>
                <NavigationItem
                  text="WHO ARE YOU"
                  route="/auth"
                  pathname={pathname}
                />
              </li>
            )}
            {user && (
              <li className={styles.navigationItemMobile}>
                <NavigationItem
                  text="PROFILE"
                  route="/profile"
                  pathname={pathname}
                />
              </li>
            )}
            {user && (
              <li className={styles.navigationItemMobile}>
                <NavigationItem
                  text="WRITE"
                  route="/post/write"
                  pathname={pathname}
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
