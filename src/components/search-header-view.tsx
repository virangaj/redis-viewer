import React, { ChangeEvent, FC } from "react";
import { Input } from "./ui/input";
import KeyTypesSelector from "./key-types-selector";

interface SearchHeaderViewProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchHeaderView: FC<SearchHeaderViewProps> = ({
    searchText,
  setSearchText,
}) => {
  return (
    <div className="flex w-full my-2 h-10 bg-gray-100 dark:bg-gray-800 rounded-md items-center">
      <KeyTypesSelector />
      <Input
        type="text"
        name="search"
        placeholder="Filter by key"
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
    </div>
  );
};

export default SearchHeaderView;
