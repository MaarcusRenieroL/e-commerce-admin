import { registerSchema } from "~/lib/zod-schema";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import bcrypt from "bcryptjs";

export const userRouter = router({
  addUser: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
    try {
      const { email, password, confirmPassword } = input;

      if (!email || !password || !confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing required fields",
        });
      }

      const existingUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const newUser = await db.user.create({
        data: {
          email: email,
          password: await bcrypt.hash(password, 10),
        },
      });

      return {
        data: newUser,
        statusCode: 200,
        message: "User created succesfully",
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error creating user",
      });
    }
  }),
});
