"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import Input from "@shared/components/Input";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search"?.toString()) || ""}
      placeholder="Szukaj..."
    />
  );
};

export default SearchBar;
