import { useEffect, useState } from "react";

import axios from "../utils/axiosInstance";
import ListingCard from "../components/ListingCard";



function Listings() {
  const [listings, setListings] = useState([]);
  

  useEffect(() => {
    
    axios
      .get(`/listings`)
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
