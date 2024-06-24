"use client";

import { useEffect } from "react";
import { useStoreModal } from "~/hooks/use-store-modal";

export default function Page() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div>
      <h1>Root page</h1>
    </div>
  );
}