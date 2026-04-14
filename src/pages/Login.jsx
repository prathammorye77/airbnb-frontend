import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
const API = import.meta.env.VITE_API_URL;

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
      const res = await axios.post(`${API}/login`, data);

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
    <>
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Login</h2>

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

          {/* BUTTON */}
          <button disabled={isSubmitting} className="btn btn-primary w-100">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        &nbsp;

        <GoogleLogin
        onSuccess={async (credentialResponse) => {
           console.log(credentialResponse);
          try {
            const res = await axios.post(`${API}/auth/google`, {
              token: credentialResponse.credential,
            });

            login(res.data.user, res.data.token);
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      </div>
      
    </>
  );
}

export default Login;
