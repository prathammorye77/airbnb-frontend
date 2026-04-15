import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";

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

      const res = await axios.post(`/register`, cleanData);

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100 px-3">
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="card p-4 shadow-sm border-0 rounded-4"
        >
          <FormInput
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />

          <button
            disabled={isSubmitting}
            className="btn btn-success w-100 mt-3"
          >
            {isSubmitting ? "Creating..." : "Signup"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-3 text-muted">OR</div>

        {/* GOOGLE LOGIN */}
       <GoogleButton />
        {/* Footer */}
        <p className="text-center mt-3 small">
          Already have an account?{" "}
          <a href="/login" className="fw-semibold text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
