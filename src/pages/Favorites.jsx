import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import ListingCard from "../components/ListingCard";


function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(`/favorites`).then((res) => {
      setFavorites(res.data);
    });
  }, [favorites]);

  return (
    <div className="container mt-5">
      <h2>My Favorites ❤️</h2>

      <div className="row">
        {favorites.map((listing) => (
          <ListingCard key={listing._id} listing={listing} flag={true}/>
        ))}
      </div>
    </div>
  );
}

export default Favorites;