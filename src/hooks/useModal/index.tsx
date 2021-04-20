import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalContainer } from '@/components/modal';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const Modal = ({ children }: { children: React.ReactNode }) => (
    <ModalContainer show={showModal}>{children}</ModalContainer>
  );

  useEffect(() => {}, [showModal]);

  return { Modal, setShowModal };
};
