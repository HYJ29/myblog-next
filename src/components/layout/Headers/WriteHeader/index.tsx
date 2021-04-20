import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useModal } from '@/hooks/useModal';
import { XCircle } from '@/components/icons';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function WriteHeader() {
  const router = useRouter();
  const { Modal, setShowModal } = useModal();

  const ModalContent = () => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            hi
            <div
              className={styles.modalXIcon}
              onClick={() => setShowModal(false)}
            >
              <XCircle />
            </div>
          </div>
        </div>
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
        <ControllerItem text="Save" onClick={() => {}} />
        <ControllerItem
          text="Publish"
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
