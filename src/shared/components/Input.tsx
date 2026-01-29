import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const baseClass =
  "w-full py-3 px-4 mb-4 text-slate-700 placeholder-slate-400 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 font-semibold text-sm text-slate-700">{label}</label>
      )}
      <input
        ref={ref}
        className={`${baseClass} ${className} ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
