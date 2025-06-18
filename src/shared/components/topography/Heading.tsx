import { cn } from "@/src/shared/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  retro?: boolean;
};

const Heading = ({
  level = 1,
  children,
  className = "",
  retro,
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyle = {
    1: "text-h1",
    2: "text-h2",
    3: "text-h3",
    4: "text-h4",
  }[level];

  const font = retro ? "font-retro" : "font-sans";

  return <Tag className={cn(baseStyle, font, className)}>{children}</Tag>;
};

export default Heading;
