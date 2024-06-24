"use client";

import { FC } from "react";
import { Modal } from ".";
import { useStoreModal } from "~/hooks/use-store-modal";

export const StoreModal: FC = () => {
  const store = useStoreModal();
  return (
    <Modal
      isOpen={store.isOpen}
      onClose={store.onClose}
      title="Create store"
      description="Add a new store to manage products and categories"
    >
      Create Store Form
    </Modal>
  );
};
