import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import AddReview from "./AddReview";

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  // Fetch listing
  useEffect(() => {
    axios
      .get(`/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    axios
      .get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchListing = async () => {
    try {
      const res = await axios.get(`/listings/${id}`);
      setListing(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted");
      fetchReviews();
      fetchListing();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container-fluid px-2 px-md-4 py-3">
   
      <div className="card border-0 shadow rounded-4 overflow-hidden">
        
        {/* Image */}
        <img
          src={listing.image?.url}
          alt={listing.title}
          className="w-100 rounded-top"
          style={{
            height: window.innerWidth < 768 ? "200px" : "350px",
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          {/* Title */}
          <h2 className="fw-bold mb-2 fs-4 fs-md-3">{listing.title}</h2>

          {/* Location */}
          <p className="text-muted mb-2">
            📍 {listing.location}, {listing.country}
          </p>

          {/* Price */}
          <h4 className="fw-semibold mb-3 fs-5 fs-md-4">
            ₹ {listing.price.toLocaleString("en-IN")}
            <span className="text-muted fs-6"> / night</span>
          </h4>

          {/* Description */}
          <p className="mt-3" style={{ lineHeight: "1.6" }}>
            {listing.description}
          </p>

          {/* Owner buttons */}
          {user && isOwner && (
            <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
              <Link
                to={`/listings/${listing._id}/edit`}
                className="btn btn-dark w-100"
              >
                ✏️ Edit
              </Link>

              <button className="btn btn-danger w-100" onClick={handleDelete}>
                🗑 Delete
              </button>
            </div>
          )}

          <hr className="my-4" />

          {/* Reviews Heading */}
          <h4 className="mt-2">Reviews</h4>

          {/* Avg Rating */}
          <h5 className="mb-3">
            ⭐ {listing.avgRating?.toFixed(1) || 0} ({listing.reviewCount}{" "}
            reviews)
          </h5>

          {/* Add Review */}
          {user && (
            <AddReview
              listingId={listing._id}
              onReviewAdded={() => {
                fetchReviews();
                fetchListing();
              }}
            />
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <p className="text-muted text-center mt-3">No reviews yet</p>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="border rounded-3 p-3 mt-3 shadow-sm bg-light"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-1 fw-semibold">{r.user?.name}</h6>
                  <span className="text-warning fw-bold">⭐ {r.rating}</span>
                </div>

                <p className="mb-2 text-muted">{r.comment}</p>

                {user && user._id === r.user?._id && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteReview(r._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
