import { cn, fixGlyphs } from "@/src/shared/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
};

const Heading = ({
  level = 1,
  children,
  className = "",
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseStyle = {
    1: "text-h1",
    2: "text-h2",
    3: "text-h3",
    4: "text-h4",
  }[level];

  return (
    <Tag className={cn(baseStyle, "font-sans", className)}>
      {typeof children === "string" ? fixGlyphs(children) : children}
    </Tag>
  );
};

export default Heading;
