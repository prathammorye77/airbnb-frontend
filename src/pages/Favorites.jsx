import { useFavorites } from "../context/FavoritesContext";
import ListingCard from "../components/ListingCard";
function Favorites() {
   const { favorites } = useFavorites();

  return (
    <div className="container mt-5">
      <h2>My Favorites ❤️</h2>

      <div className="row">
        {favorites.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;