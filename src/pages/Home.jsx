import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useGames } from "../hooks/useGames";
import { useSearch } from "../hooks/useSearch";
import Sidebar from "../components/home/Sidebar";
import Header from "../components/home/Header";
import GameGrid from "../components/home/GameGrid";
import MobileMenu from "../components/home/MobileMenu";
import HowToPlay from "../components/HowToPlay";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showControllers, setShowControllers] = useState(false);

  const { currentUser, signInWithGoogle, handleLogout } = useAuth();
  const {
    games,
    categories,
    selectedCategory,
    favoriteGames,
    showFavoritesOnly,
    handleCategoryClick,
    toggleFavoritesFilter,
    toggleFavorite,
  } = useGames(currentUser);

  const { handleSearch, filteredGames } = useSearch(games);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 relative">
        <MobileMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <Sidebar
          setShowControllers={setShowControllers}
          showControllers={showControllers}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
          currentUser={currentUser}
          showFavoritesOnly={showFavoritesOnly}
          toggleFavoritesFilter={toggleFavoritesFilter}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            currentUser={currentUser}
            handleLogout={handleLogout}
            signInWithGoogle={signInWithGoogle}
            handleSearch={handleSearch}
          />

          {showControllers ? (
            <HowToPlay />
          ) : (
            <GameGrid
              games={filteredGames}
              currentUser={currentUser}
              favoriteGames={favoriteGames}
              toggleFavorite={toggleFavorite}
              showFavoritesOnly={showFavoritesOnly}
              selectedCategory={selectedCategory}
              toggleFavoritesFilter={toggleFavoritesFilter}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
