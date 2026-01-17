import React, { useEffect, useState } from "react";

export const SearchBar = React.memo(
  ({ onSearch, delay = 500, placeholder = "Search..." }) => {
    const [tempQuery, setTempQuery] = useState("");

    useEffect(() => {
      const timer = setTimeout(() => {
        onSearch(tempQuery);
      }, delay);

      return () => clearTimeout(timer);
    }, [tempQuery]);

    function handleClear() {
      setTempQuery("");
    }

    return (
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </div>

        <input
          type="text"
          value={tempQuery}
          placeholder={placeholder}
          onChange={(e) => setTempQuery(e.target.value)}
          className="
          w-full
          rounded-lg
          border
          py-1
          pl-10
          pr-10
          text-sm
          placeholder-gray-400
          shadow-sm
          focus:border-blue-500
          focus:outline-none
        "
        />

        {tempQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="
            absolute inset-y-0 right-3
            flex items-center
          "
            aria-label="Clear search"
          >
            ❌
          </button>
        )}
      </div>
    );
  },
);
