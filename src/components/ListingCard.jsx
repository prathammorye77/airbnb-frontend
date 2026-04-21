import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "./ListingCard.css";

function ListingCard({ listing }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
        {/* Image */}
        <div className="position-relative">
          <img
            src={listing.image?.url}
            className="card-img-top"
            alt={listing.title}
            style={{
              height: "180px",
              objectFit: "cover",
            }}
          />

          {/* Favorite Button Overlay */}
          <div
            className="position-absolute top-0 end-0 m-2 p-2 rounded-circle"
             style={{ zIndex: 10, background: "transparent" }}
          >
            <FavoriteButton listingId={listing._id} />
          </div>
        </div>

        {/* Body */}
        <div className="card-body d-flex flex-column p-3">
          {/* Title */}
          <h6 className="fw-bold text-truncate mb-1">{listing.title}</h6>

          {/* Location */}
          <p className="text-muted small mb-2">
            📍 {listing.location}, {listing.country}
          </p>

          {/* Rating */}
          <p className="small mb-2">
            <span className="text-warning fw-semibold">
              ⭐ {listing.avgRating?.toFixed(1) || 0}
            </span>
            <span className="text-muted"> ({listing.reviewCount} reviews)</span>
          </p>

          {/* Price */}
          <p className="fw-semibold mb-3">
            ₹ {listing.price.toLocaleString("en-IN")}
            <span className="text-muted small"> / night</span>
          </p>

          {/* Description */}
          <p className="text-muted small mb-3" style={{ minHeight: "40px" }}>
            {listing.description.substring(0, 60)}...
          </p>

          {/* Button */}
          <Link
            className="btn btn-dark w-100 mt-auto rounded-3"
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
