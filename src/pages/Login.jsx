import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await axios.post(`/login`, data);

      login(res.data.user, res.data.token); //  store token

      toast.update(toastId, {
        render: "Login successful ✅",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";

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
        {/* Title */}
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        {/* Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="card p-4 shadow-sm border-0 rounded-4"
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

          {/* BUTTON */}
          <button disabled={isSubmitting} className="btn btn-dark w-100 mt-3">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-3 text-muted">OR</div>

        {/* Google Login */}
        <GoogleButton />
      </div>
    </div>
  );
}

export default Login;
