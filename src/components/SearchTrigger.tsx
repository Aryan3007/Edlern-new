// SearchTrigger.jsx
import { useState } from "react";
import SearchModal from "./SearchModal";
import { Search } from "lucide-react"; // You can replace with any icon

const SearchTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="text-sm mt-2 md:mt-1 rounded-full"
        onClick={() => setIsOpen(true)}
        aria-label="Search"
      >
        <Search />
      </button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SearchTrigger;
