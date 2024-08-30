"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

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
    <input
      className="rounded-r-3xl w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search"?.toString()) || ""}
      placeholder="Search..."
    />
  );
};

export default SearchBar;
