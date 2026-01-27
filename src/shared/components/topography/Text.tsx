import { cn, fixGlyphs } from "@/src/shared/lib/utils";
import { ReactNode } from "react";

type TextProps = {
  size?: "body" | "small" | "label";
  children: ReactNode;
  className?: string;
};

const Text = ({
  size = "body",
  children,
  className = "",
}: TextProps) => {
  const sizeClass = `text-${size}`;
  return (
    <p className={cn(sizeClass, "font-sans", className)}>
      {typeof children === "string" ? fixGlyphs(children) : children}
    </p>
  );
};

export default Text;
