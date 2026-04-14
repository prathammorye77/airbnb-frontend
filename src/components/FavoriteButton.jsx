import axios from "../utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function FavoriteButton({ listingId, isFavInitial }) {
  const [isFav, setIsFav] = useState(isFavInitial);
  const {userFav} = useAuth();

  const handleFavorite = async () => {
    try {
      const res = await axios.post(`/favorites/${listingId}`);
      setIsFav((setIsFav) => !setIsFav);
      userFav(res.data.favorites);
      
      console.log(res.data.favorites)
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Error updating favorite");
    }
  };

  return (
    <button onClick={handleFavorite} className="btn">
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;