import { useEffect, useState } from "react";

import axios from "../utils/axiosInstance";
import ListingCard from "../components/ListingCard";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_URL;

function Listings() {
  const [listings, setListings] = useState([]);
  const {fav} = useAuth();

  useEffect(() => {
    
    axios
      .get(`${API}/listings`)
      .then((res) => setListings(res.data))
      .catch((err) => {
        console.log(err)
        });
    },[])

  return (
    <div className="container mt-5">
      <div className="row">
        <h1>Total Listings: {listings.length}</h1>
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing}/>
        ))}
      </div>
    </div>
  );
}
export default Listings;
