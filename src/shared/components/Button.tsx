import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "success" | "error" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  className?: string;
}

const baseClass =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed";

const variantClass: Record<string, string> = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700",
  success: "bg-success text-white hover:bg-green-700",
  error: "bg-error text-white hover:bg-red-700",
  outline: "border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50",
  white: "bg-white text-emerald-700 border border-gray-200 hover:bg-gray-100",
};

const sizeClass: Record<string, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", size = "md", loading = false, className = "", disabled, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={[
        baseClass,
        variantClass[variant] || variantClass.primary,
        sizeClass[size] || sizeClass.md,
        className,
      ].join(" ")}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="loading loading-spinner loading-xs mr-2" /> : null}
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
