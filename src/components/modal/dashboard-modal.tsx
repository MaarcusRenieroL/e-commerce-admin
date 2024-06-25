"use client";

import { useStoreModal } from "~/hooks/use-store-modal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const DashboardStoreModal = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  router.refresh();

  return null;
};
