import { Button } from "~/components/ui/button";
import Link from "next/link";
import { FC } from "react";

export const GetStartedSection: FC = () => {
  return (
    <section
      id="get-started"
      className="w-full py-12 md:py-24 lg:py-32 border-t"
    >
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 space-y-5">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Get Started with E Commerce Admin Portal
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sign up today and experience the ultimate e commerce solution.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-5">
          <Link href="/auth/sign-up">
            {" "}
            <Button type="submit">Sign Up</Button>
          </Link>
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link
              href="#"
              className="underline underline-offset-2"
              prefetch={false}
            >
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
