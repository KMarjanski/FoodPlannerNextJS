import { cn } from "@/src/shared/lib/utils";
import { ReactNode } from "react";

type TextProps = {
  size?: "body" | "small" | "label";
  children: ReactNode;
  className?: string;
  retro?: boolean;
};

const Text = ({
  size = "body",
  children,
  className = "",
  retro,
}: TextProps) => {
  const font = retro ? "font-retro" : "font-sans";
  const sizeClass = `text-${size}`;
  return <p className={cn(sizeClass, font, className)}>{children}</p>;
};

export default Text;
