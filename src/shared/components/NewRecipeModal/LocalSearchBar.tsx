/* eslint-disable no-unused-vars */
import React from "react";
import Input from "@shared/components/Input";

interface LocalSearchBarProps {
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const LocalSearchBar: React.FC<LocalSearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Szukaj..."}
    />
  );
};

export default LocalSearchBar;
