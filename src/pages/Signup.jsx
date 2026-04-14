import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating account...");

    try {
      const { confirmPassword, ...cleanData } = data;

      const res = await axios.post("/register", cleanData);

      login(res.data.user, res.data.token);

      toast.update(toastId, {
        render: "Account created successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";

      toast.update(toastId, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Signup</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="card p-4 shadow"
      >
        {/* EMAIL */}
        <FormInput
          label="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        {/* PASSWORD */}
        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />

        {/* CONFIRM PASSWORD */}
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          register={register}
          error={errors.confirmPassword}
        />

        {/* BUTTON */}
        <button disabled={isSubmitting} className="btn btn-success w-100">
          {isSubmitting ? "Creating..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
