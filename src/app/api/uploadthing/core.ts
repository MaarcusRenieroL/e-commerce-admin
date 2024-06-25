import { createUploadthing, type FileRouter as FR } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "~/lib/auth";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const user = await getServerAuthSession();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FR;

export type FileRouter = typeof fileRouter;
