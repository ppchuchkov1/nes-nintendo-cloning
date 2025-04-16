import React from "react";
import { Heart, Settings } from "lucide-react";
import logo from "../../assets/logo.jpg";
const Sidebar = ({
  categories,
  selectedCategory,
  handleCategoryClick,
  currentUser,
  showFavoritesOnly,
  toggleFavoritesFilter,
  setShowControllers,
  sidebarOpen,
  showControllers,
}) => {
  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static z-20 w-64 h-full bg-white shadow-sm flex flex-col transform transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 flex items-center">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-4">
          <li
            className={`flex cursor-pointer items-center py-3 px-2 rounded text-gray-700 hover:bg-gray-100 ${
              selectedCategory === "all" &&
              !showControllers &&
              !showFavoritesOnly
                ? "bg-gray-200 font-medium"
                : ""
            }`}
            onClick={() => {
              setShowControllers(false);
              handleCategoryClick("all");
            }}
          >
            <div className="flex gap-3">
              <img
                width="30px"
                src="https://img.icons8.com/?size=512&id=5kiKL9r9njdS&format=png"
                alt="All Games"
              />
              <span>All Games</span>
            </div>
          </li>

          {categories.map((category) => (
            <li
              key={category.id}
              className={`flex cursor-pointer items-center py-3 px-2 rounded text-gray-700 hover:bg-gray-100 ${
                selectedCategory === category.name && !showControllers
                  ? "bg-gray-200 font-medium"
                  : ""
              }`}
              onClick={() => {
                handleCategoryClick(category.name);
                setShowControllers(false);
              }}
            >
              <div className="flex gap-3">
                <img width="30px" src={category.icon} alt={category.name} />
                <span>{category.name}</span>
              </div>
            </li>
          ))}
        </ul>

        {currentUser && (
          <div className="mt-6 px-4">
            <button
              onClick={() => {
                toggleFavoritesFilter();
                setShowControllers(false);
              }}
              className={`flex w-full items-center py-3 px-2 rounded ${
                showFavoritesOnly && !showControllers
                  ? "bg-red-100 text-red-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Heart
                className={`mr-2 ${
                  showFavoritesOnly && !showControllers
                    ? "fill-red-500 text-red-500"
                    : ""
                }`}
                size={18}
              />
              <span className="font-medium">Favorite Games</span>
            </button>
          </div>
        )}

        <div
          onClick={() => setShowControllers(true)}
          className="mt-8 px-4 pb-6 "
        >
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            How to play
          </h3>
          <ul className="py-3 rounded">
            <li
              className={`flex cursor-pointer items-center py-3 px-3 rounded text-gray-700 hover:bg-gray-100 ${
                showControllers ? "bg-gray-200" : ""
              }`}
            >
              <Settings className="mr-3 text-gray-500" size={20} />
              <span className="text-gray-700">Controllers</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
