import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };

  return (
    <nav
      className="navbar navbar-dark px-4"
      style={{ backgroundColor: "darkgrey" }}
    >
      <Link className="navbar-brand text-danger fw-semibold" to="/">
        Airbnb Clone
      </Link>

      <div className="text-primary">
        {user ? (
          <>
            <span className="me-3">👤 {user.email}</span>

            <Link
              to="/create"
              className="btn btn-primary fw-semibold btn-sm"
            >
              + Add Listing
            </Link>
            &nbsp;
            <Link
              to="/Favorites"
              className="btn btn-danger fw-semibold btn-sm"
            >
              Favorites
            </Link>
             &nbsp;
            <button className="btn-danger"onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
