import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const GameGrid = ({
  games,
  currentUser,
  favoriteGames,
  toggleFavorite,
  showFavoritesOnly,
  selectedCategory,
  toggleFavoritesFilter,
}) => {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {showFavoritesOnly
              ? "Favorite Games"
              : selectedCategory === "all"
              ? "All Games"
              : selectedCategory}
          </h1>

          {currentUser && (
            <button
              onClick={toggleFavoritesFilter}
              className={`md:hidden flex items-center px-3 py-2 rounded-md ${
                showFavoritesOnly
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <Heart
                size={16}
                className={`mr-1 ${
                  showFavoritesOnly ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="text-sm">
                {showFavoritesOnly ? "All" : "Favorite"}
              </span>
            </button>
          )}
        </div>

        <p className="text-gray-500 mb-4">
          {games.length} game{games.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {games.length > 0 ? (
            games.map((item) => (
              <div key={item.id} className="relative">
                <Link to={item.nes}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-60">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 pt-8">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.categories && Array.isArray(item.categories)
                          ? item.categories.join(", ")
                          : "No categories"}
                      </p>
                    </div>
                  </div>
                </Link>

                {currentUser && (
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
                  >
                    {favoriteGames.includes(item.id) ? (
                      <Heart size={20} className="fill-red-500 text-red-500" />
                    ) : (
                      <Heart size={20} className="text-gray-700" />
                    )}
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {showFavoritesOnly
                  ? "You have no favorite games. Add some by pressing the heart icon."
                  : "No games found in this category."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
