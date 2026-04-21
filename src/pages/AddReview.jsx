import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "../validation/reviewSchema";
import FormInput from "../components/FormInput";
function AddReview({ listingId, onReviewAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Adding review...");

    try {
      const res = await axios.post(`/reviews/${listingId}`, {
        rating: data.rating,
        comment: data.comment,
      });

      toast.update(toastId, {
        render: res.data.message || "Review added",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      reset();
      onReviewAdded && onReviewAdded();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";

      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-3 mt-4">
      <h5>Add Review</h5>

      {/* Rating */}

      <FormInput
        label="Rating"
        name="rating"
        type="number"
        register={register}
        error={errors.rating}
      />

      <div className="mb-3">
        <FormInput
          label="Comment"
          name="comment"
          type="text"
          register={register}
          error={errors.comment}
        />
        
      </div>

      <button disabled={isSubmitting} className="btn btn-dark">
        {isSubmitting ? "Adding..." : "Submit Review"}
      </button>
    </form>
  );
}

export default AddReview;
