import { useEffect, useRef, useState } from "react";

export function SearchBar({
  onSearch,
  delay = 500,
  placeholder = "Search...",
}) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(onSearch);

  useEffect(() => {
    searchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsLoading(true);
      await searchRef.current(query);
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsLoading(true);
      await searchRef.current(query);
      setIsLoading(false);
    }

    if (e.key === "Escape") {
      handleClear();
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
        🔍
      </div>

      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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

      {isLoading && (
        <div className="absolute inset-y-0 right-9 flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      )}

      {query && !isLoading && (
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
}
