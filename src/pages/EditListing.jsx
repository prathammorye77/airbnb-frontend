import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingSchema } from "../validation/listingSchema";
import FormInput from "../components/FormInput";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSchema),
  });

  // 🔥 Fetch existing data
  useEffect(() => {
    axios
      .get(`/listings/${id}`)
      .then((res) => {
        const listing = res.data;

        // set values in form
        setValue("title", listing.title);
        setValue("description", listing.description);
        setValue("price", listing.price);
        setValue("location", listing.location);
        setValue("country", listing.country);
      })
      .catch((err) => console.log(err));
  }, [id, setValue]);

  // 🔥 Submit handler
  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating...");

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("country", data.country);

      // 🔥 VERY IMPORTANT
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await axios.put(`/listings/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.update(toastId, {
        render: "Listing updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate(`/listings/${id}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Update failed";

      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Listing</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="card p-4 shadow"
      >
        <FormInput
          label="Title"
          name="title"
          register={register}
          error={errors.title}
        />

        <FormInput
          label="Description"
          name="description"
          register={register}
          error={errors.description}
        />

        <FormInput
          label="Price"
          name="price"
          type="number"
          register={register}
          error={errors.price}
        />

        <FormInput
          label="Location"
          name="location"
          register={register}
          error={errors.location}
        />

        <FormInput
          label="Country"
          name="country"
          register={register}
          error={errors.country}
        />

        <FormInput
          label="Image"
          name="image" // 🔥 MUST BE "image"
          type="file"
          register={register}
          error={errors.image}
        />

        {/* BUTTON */}
        <button className="btn btn-primary">UPDATE</button>
      </form>
    </div>
  );
}

export default EditListing;
