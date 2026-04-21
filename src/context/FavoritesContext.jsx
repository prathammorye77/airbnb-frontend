import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  // fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/favorites");
      setFavorites(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  // toggle favorite
  const toggleFavorite = async (listingId) => {
    if (user) {
      const toastId = toast.loading("loading...");

      try {
        // ✅ Optimistic update (instant UI)
        setFavorites((prev) =>
          prev.some((fav) => fav._id === listingId)
            ? prev.filter((fav) => fav._id !== listingId)
            : [...prev, { _id: listingId }],
        );

        // ✅ API call
        const res = await axios.post(`/favorites/${listingId}`);
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        // ✅ Sync with backend (fix inconsistencies)
        await fetchFavorites();
      } catch (err) {
        console.log(err);

        // ❌ rollback if error
        await fetchFavorites();
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// custom hook
export const useFavorites = () => useContext(FavoritesContext);
