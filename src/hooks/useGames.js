import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const useGames = (currentUser) => {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const fetchUserFavorites = async (userId) => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().favorites) {
          setFavoriteGames(userDoc.data().favorites);
        } else {
          await setDoc(userDocRef, { favorites: [] }, { merge: true });
          setFavoriteGames([]);
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };

    if (currentUser) {
      fetchUserFavorites(currentUser.uid);
    } else {
      setFavoriteGames([]);
      setShowFavoritesOnly(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "games"), orderBy("order", "asc"))
        );
        const gamesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllGames(gamesData);
        filterGames(gamesData, selectedCategory, showFavoritesOnly);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchGames();
  }, [favoriteGames]);

  useEffect(() => {
    if (allGames.length > 0) {
      filterGames(allGames, selectedCategory, showFavoritesOnly);
    }
  }, [selectedCategory, showFavoritesOnly, favoriteGames]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .reverse();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  const filterGames = (gamesData, category, favoritesOnly) => {
    let filteredGames = [...gamesData];

    if (favoritesOnly && currentUser) {
      filteredGames = filteredGames.filter((game) =>
        favoriteGames.includes(game.id)
      );
    } else if (category !== "all") {
      filteredGames = filteredGames.filter(
        (game) =>
          game.categories &&
          Array.isArray(game.categories) &&
          game.categories.includes(category)
      );
    }

    setGames(filteredGames);
  };

  const handleCategoryClick = (categoryName) => {
    setShowFavoritesOnly(false);
    setSelectedCategory(categoryName);
  };

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    if (!showFavoritesOnly) {
      setSelectedCategory("all");
    }
  };

  const toggleFavorite = async (gameId, event) => {
    event.preventDefault();

    if (!currentUser) {
      alert("Please log in to add games to favorites.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);

      if (favoriteGames.includes(gameId)) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(gameId),
        });
        setFavoriteGames(favoriteGames.filter((id) => id !== gameId));
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(gameId),
        });
        setFavoriteGames([...favoriteGames, gameId]);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return {
    games,
    categories,
    selectedCategory,
    favoriteGames,
    showFavoritesOnly,
    handleCategoryClick,
    toggleFavoritesFilter,
    toggleFavorite,
  };
};
