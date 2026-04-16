import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import AddListing from "./pages/AddListing";
import EditListing from "./pages/EditListing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import Favorites from "./pages/Favorites";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <AddListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listings/:id/edit"
              element={
                <ProtectedRoute>
                  <EditListing />
                </ProtectedRoute>
              }
            />
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
