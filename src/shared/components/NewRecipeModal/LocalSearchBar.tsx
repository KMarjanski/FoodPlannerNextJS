
/* eslint-disable no-unused-vars */
import React from "react";

interface LocalSearchBarProps {
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const LocalSearchBar: React.FC<LocalSearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="w-full py-3 px-4 mb-4 text-slate-700 placeholder-slate-400 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Szukaj..."}
    />
  );
};

export default LocalSearchBar;
