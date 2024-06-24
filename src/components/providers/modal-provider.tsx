"use client";

import { FC, useEffect, useState } from "react";
import { StoreModal } from "~/components/modal/store";

export const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <StoreModal />;
};
