import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { listingSchema } from "../validation/listingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";

function AddListing() {
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   price: "",
  //   location: "",
  //   country: "",
  //   imageUrl: "",
  // });

  // handle input change
  // function handleChange(e) {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // handle form submit
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const result = listingSchema.safeParse(formData);

  //   if (!result.success) {
  //     const firstError = result.error.issues[0].message;
  //     toast.error(firstError); // 🔥 show error
  //     return;
  //   }

  //   const newListing = {
  //     title: formData.title,
  //     description: formData.description,
  //     price: Number(formData.price),
  //     location: formData.location,
  //     country: formData.country,
  //     imageUrl: formData.imageUrl,
  //   };

  //   axios
  //     .post("http://localhost:8080/listings", newListing)
  //     .then((res) => {
  //       toast.success(`${res.data.message} `);
  //       navigate("/listings");
  //     })
  //     .catch((err) => {
  //       const msg = err.response?.data?.message || "Something went wrong";
  //       toast.error(msg); // 🔥 SHOW ERROR HERE
  //       console.log("ERROR:", err.response?.data || err);
  //     });
  // }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(listingSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Adding...");

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("country", data.country);

      // 🔥 FILE (IMPORTANT)
      formData.append("image", data.image[0]);

      const res = await axios.post("/listings", formData);

      toast.update(toastId, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";

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
      <h2 className="mb-4">Add New Listing</h2>
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
          name="image" // 🔥 must match backend
          type="file"
          register={register}
          error={errors.image}
        />

        {/* BUTTON */}
        <button disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}

export default AddListing;
