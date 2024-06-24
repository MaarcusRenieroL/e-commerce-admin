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

export default function SignUpPage() {
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
          <form>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div className="mt-5 space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <div className="mt-5 space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Re-enter your password" />
            </div>
            <Button className="w-full mt-5">Sign in</Button>
          </form>
        </CardContent>
        <CardFooter className="p-0 flex items-center justify-center w-full mt-5">
          Don't have an account?{" "}
          <span className="ml-3">
            <Link href="/sign-up">
              <Button variant="link" className="hover:underline">
                Sign up
              </Button>
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
