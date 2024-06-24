"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import Logo from "../../../favicon.ico";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "~/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "~/lib/trpc/client";
import {
  Form,
  FormLabel,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: addNewUser } = client.user.addUser.useMutation({
    onSuccess: () => {
      toast("Success", {
        description: "User created successfully",
      });
    },
    onError: (error) => {
      toast("Error", {
        description: "Error creating user",
      });
      console.log(error);
    },
  });

  const handleSignUp = async (data: z.infer<typeof registerSchema>) => {
    await addNewUser(data);
    router.push("/auth/sign-in");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="p-10">
        <CardHeader className="flex flex-col justify-center items-center space-y-4 text-center">
          <Image src={Logo} alt="Logo" width={25} height={25} />
          <CardTitle>Sign in to your task management app</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignUp)}>
              <div className="space-y-5">
                {" "}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label>Email</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label>Password</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label>Confirm Password</Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full mt-5">Sign in</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-0 flex items-center justify-center w-full mt-5">
          Already have an account?
          <span className="ml-3">
            <Link href="/auth/sign-in">
              <Button variant="link" className="hover:underline">
                Sign in
              </Button>
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
