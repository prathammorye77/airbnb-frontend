import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-danger" to="/">
          Airbnb Clone
        </Link>

        {/* Toggle button (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          {user ? (
            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
              {/* User */}
              <span className="text-white small">👤 {user.email}</span>

              {/* Buttons */}
              <Link to="/create" className="btn btn-outline-light btn-sm">
                + Add
              </Link>

              <Link to="/favorites" className="btn btn-outline-danger btn-sm">
                ❤️ Favorites
              </Link>

              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
              <Link to="/login" className="btn btn-outline-light btn-sm">
                Login
              </Link>

              <Link to="/signup" className="btn btn-success btn-sm">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
