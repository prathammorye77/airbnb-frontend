import { useFavorites } from "../context/FavoritesContext";


function FavoriteButton({ listingId }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = favorites.some((fav) => fav._id === listingId);

  return (
    <button  className="border-0" onClick={() => toggleFavorite(listingId)}  style={{ zIndex: 10, background: "transparent" }}>
      {isFav  ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
