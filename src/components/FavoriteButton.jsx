import { useFavorites } from "../context/FavoritesContext";

function FavoriteButton({ listingId }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = favorites.some((fav) => fav._id === listingId);

  return (
    <button className="border-0 bg-white bg-opacity-50" onClick={() => toggleFavorite(listingId)}>
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
