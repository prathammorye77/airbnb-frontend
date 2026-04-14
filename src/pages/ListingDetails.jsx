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
    <div className="container mt-4">
      <div className="card shadow">
        <img
          src={listing.image?.url}
          className="card-img-top"
          alt={listing.title}
          style={{ height: "400px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h3>{listing.title}</h3>

          <p>{listing.description}</p>

          <h5>₹ {listing.price.toLocaleString("en-IN")} / night</h5>

          <p className="text-muted">
            {listing.location}, {listing.country}
          </p>
        </div>
      </div>

      {user && isOwner && (
        <>
          <Link
            to={`/listings/${listing._id}/edit`}
            className="btn btn-primary mt-3"
          >
            Edit Details
          </Link>
          <button className="btn btn-danger mt-3 ms-2" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default ListingDetails;
