import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "./ListingCard.css";

function ListingCard({ listing, flag }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 hover-card border-0">
        {/* Image */}
        <img
          src={listing.image?.url}
          className="card-img-top"
          alt={listing.title}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />

        {/* Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-truncate">{listing.title}</h5>

          <p className="card-text text-muted small">
            {listing.description.substring(0, 80)}...
          </p>

          <p className="fw-semibold mb-1">
            ₹ {listing.price.toLocaleString("en-IN")} / night
          </p>

          <p className="text-muted small mb-2">
            {listing.location}, {listing.country}
          </p>

          <div className="mb-2">
            <FavoriteButton listingId={listing._id} isFavInitial={flag} />
          </div>
          <Link
            className="btn btn-dark w-100 mt-auto"
            to={`/listings/${listing._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
