import { useState, useCallback } from "react";

export const useSearch = (games) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((query) => {
    setSearchQuery(query.toLowerCase());
  }, []);

  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery) ||
      (game.categories &&
        Array.isArray(game.categories) &&
        game.categories.some((category) =>
          category.toLowerCase().includes(searchQuery)
        ))
  );

  return {
    searchQuery,
    handleSearch,
    filteredGames,
  };
};
