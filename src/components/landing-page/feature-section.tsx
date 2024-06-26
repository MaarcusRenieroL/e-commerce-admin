import type { FC } from "react";
import Image from "next/image";
import Placeholder from "../../../public/placeholder.svg";

export const FeatureSection: FC = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Streamline Your Ecommerce Operations
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides a comprehensive suite of tools to help you
              manage your online store, from inventory management to order
              fulfillment and customer analytics.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Image
            src={Placeholder}
            width="550"
            height="310"
            alt="Feature"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Inventory Management</h3>
                  <p className="text-muted-foreground">
                    Track your product inventory in real-time and receive alerts
                    when stock is low.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Order Fulfillment</h3>
                  <p className="text-muted-foreground">
                    Streamline your order processing and shipping with
                    integrated logistics tools.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Customer Analytics</h3>
                  <p className="text-muted-foreground">
                    Gain valuable insights into your customer behavior and
                    preferences.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
