import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`/listings/${id}`)
      .then((res) => {
        setListing(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, navigate]);

  if (!listing) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  const isOwner = user?._id === listing.owner?.toString();

  function handleDelete() {
    const toastId = toast.loading("Deleting...");
    axios
      .delete(`/listings/${id}`)
      .then((res) => {
        toast.update(toastId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate(`/`);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Delete failed";

        toast.update(toastId, {
          render: `${msg} ❌`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  }

  return (
    <div className="container py-4 px-3 px-md-5">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Image */}
        <img
          src={listing.image?.url}
          alt={listing.title}
          className="w-100"
          style={{
            height: "300px",
            objectFit: "cover",
          }}
        />

        {/* Content */}
        <div className="card-body">
          {/* Title */}
          <h2 className="fw-bold mb-2">{listing.title}</h2>

          {/* Location */}
          <p className="text-muted mb-3">
            📍 {listing.location}, {listing.country}
          </p>

          {/* Price */}
          <h4 className="fw-semibold mb-3">
            ₹ {listing.price.toLocaleString("en-IN")}{" "}
            <span className="text-muted fs-6">/ night</span>
          </h4>

          {/* Divider */}
          <hr />

          {/* Description */}
          <p className="mt-3" style={{ lineHeight: "1.6" }}>
            {listing.description}
          </p>

          {/* Buttons */}
          {user && isOwner && (
            <div className="d-flex flex-column flex-md-row gap-2 mt-4">
              <Link
                to={`/listings/${listing._id}/edit`}
                className="btn btn-dark w-100 w-md-auto"
              >
                ✏️ Edit
              </Link>

              <button
                className="btn btn-danger w-100 w-md-auto"
                onClick={handleDelete}
              >
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
