import { cn, fixGlyphs } from "@/src/shared/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  noretro?: boolean;
};

const Heading = ({
  level = 1,
  children,
  className = "",
  noretro,
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyle = {
    1: "text-h1",
    2: "text-h2",
    3: "text-h3",
    4: "text-h4",
  }[level];

  const font = noretro ? "font-sans" : "font-retro";

  return (
    <Tag className={cn(baseStyle, font, className)}>
      {typeof children === "string" ? fixGlyphs(children) : children}
    </Tag>
  );
};

export default Heading;
