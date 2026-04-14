import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fav, setfav] = useState(null);

  const userFav = (favL) => {
    setfav(favL)
  }

  // 🔥 LOGIN
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // 🔥 triggers useEffect above
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // 🔥 clear favorites
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        userFav,
        fav,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔥 Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
