import { FC } from "react";

type Props = {
  title: string;
  description: string;
};

export const Heading: FC<Props> = ({ title, description }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
