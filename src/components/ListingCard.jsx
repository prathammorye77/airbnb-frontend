import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
function ListingCard({listing, flag}) {
  return (
    <div className="col-md-4 mt-5">
      <div className="card h-100 shadow" >
        <img
          src={listing.image?.url}
          className="card-img-top h-50"
          alt={listing.title}
          style={{objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="card-title">{listing.title}</h5>

          <p className="card-text">
            {listing.description.substring(0, 80)}...
          </p>

          <p className="fw-bold">
            ₹ {listing.price.toLocaleString("en-IN")} / night
          </p>

          <p className="text-muted">
            {listing.location}, {listing.country}
          </p>
          
          <FavoriteButton listingId={listing._id} isFavInitial={flag}/>

          <Link
            to={`/listings/${listing._id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
