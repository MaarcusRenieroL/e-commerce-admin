import { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { StarIcon } from "lucide-react";

export const TestimonialSection: FC = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
    >
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            What Our Customers Say
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hear from our satisfied customers about their experience with our
            ecommerce platform.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">ABC Retail</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              &quot;This Ecommerce platform has been a game-changer for our
              online store. The intuitive dashboard and powerful analytics tools
              have helped us streamline our operations and make data-driven
              decisions.&quot;
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Sarah Miller</p>
                  <p className="text-xs text-muted-foreground">XYZ Fashion</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
                <StarIcon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              &quot;I&apos;ve been using this Ecommerce platform for over a
              year\n now, and I&apos;m consistently impressed by its robust
              features\n and exceptional customer support. It&apos;s truly a
              game-changer\n for my online business.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
