import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    const toastId = toast.loading("Logging out...");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast.update(toastId, {
      render: "Logout successful ✅",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
