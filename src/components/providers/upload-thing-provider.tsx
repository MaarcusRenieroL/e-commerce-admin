import type { FC } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { fileRouter } from "~/app/api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

export const UploadThingProvider: FC = () => {
  return <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />;
};
