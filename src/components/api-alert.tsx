"use client";

import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
  variant: "public" | "admin";
};

const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: FC<Props> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast("Success", {
      description: "API copied",
      duration: 1000,
    });
  };

  return (
    <Alert className="w-full">
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex gap-5">
          <Server className="h-4 w-4" />
          <AlertTitle className="mb-0">{title}</AlertTitle>
        </div>
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </div>
      <AlertDescription className="mt-5 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onCopy(description);
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
