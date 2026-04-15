import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function GoogleButton() {
  const navigate = useNavigate();
  const { login } = useAuth();
  return (
    <div className="d-flex justify-content-center">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          try {
            const res = await axios.post(`/auth/google`, {
              token: credentialResponse.credential,
            });

            login(res.data.user, res.data.token);
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        }}
        onError={() => {
          console.log("Google Signup Failed");
        }}
      />
    </div>
  );
}
