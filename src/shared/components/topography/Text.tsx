import { cn, fixGlyphs } from "@/src/shared/lib/utils";
import { ReactNode } from "react";

type TextProps = {
  size?: "body" | "small" | "label";
  children: ReactNode;
  className?: string;
  noretro?: boolean;
};

const Text = ({
  size = "body",
  children,
  className = "",
  noretro,
}: TextProps) => {
  const font = noretro ? "font-sans" : "font-retro";
  const sizeClass = `text-${size}`;
  return (
    <p className={cn(sizeClass, font, className)}>
      {typeof children === "string" ? fixGlyphs(children) : children}
    </p>
  );
};

export default Text;
