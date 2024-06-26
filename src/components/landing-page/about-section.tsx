import { FC } from "react";

export const AboutSection: FC = () => {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              About
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              About E Commerce Admin
            </h2>
          </div>
          <div className="max-w-[900px] space-y-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            <p>
              E Commerce Admin is a powerful and intuitive admin dashboard
              designed to streamline your business operations. Our team of
              experts has decades of experience in building enterprise- grade
              software solutions, and we are committed to helping our customers
              achieve their goals.
            </p>
            <p>
              At E Commerce Admin, we believe that technology should empower
              businesses, not hinder them. That&apos;s why we&apos;ve built our
              dashboard with a focus on user-friendliness, scalability, and
              security. Our platform offers a comprehensive suite of tools to
              help you manage your team, track your sales, and optimize your
              inventory, all in one place.
            </p>
            <p>
              Whether you&apos;re a small startup or a large enterprise, E
              Commerce Admin is here to help you take your business to the next
              level. Contact us today to learn more about how our solutions can
              transform your workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
