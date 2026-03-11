import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand fw-bold" to="/">
        CKD Predictor
      </Link>

      <div className="navbar-nav ms-auto d-flex flex-row gap-3">
        <Link className="nav-link text-white" to="/">
          Dashboard
        </Link>

        <Link className="nav-link text-white" to="/predict">
          Predict CKD
        </Link>

        <Link className="nav-link text-white" to="/history">
          History
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
