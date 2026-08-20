import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/auth.api";

export default function Navbar() {
  const { user, role, refreshRole, refreshUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      await refreshUser();
      refreshRole();

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-slate-950 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              🐾
            </div>

            <div>
              <h1 className="text-white font-bold text-lg">
                Pet Adoption Portal
              </h1>

              <p className="text-slate-400 text-xs">
                Find your forever companion
              </p>
            </div>
          </Link>

          {/* Center Links */}

          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/"
              className="text-slate-300 hover:text-white transition"
            >
              Pets
            </Link>

            {role === "USER" && (
            <>
            <Link
              to="/requests"
              className="text-slate-300 hover:text-white transition"
            >
              My Requests
            </Link>
            </>
            )}

            {role === "ADMIN" && (
              <>
              <Link
                to="/admin/adoptions"
                className="text-slate-300 hover:text-white transition"
              >
                Adoption Requests
              </Link>
              <Link
                to="/admin/pets"
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  px-4
                  py-2
                  rounded-lg
                  text-white
                  transition
                "
              >
                Add Pet
              </Link>
              </>

              

            )}

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            {!role ? (
              <>
                <Link
                  to="/login"
                  className="
                    text-slate-300
                    hover:text-white
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    bg-green-600
                    hover:bg-green-700
                    px-4
                    py-2
                    rounded-lg
                    text-white
                    transition
                  "
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span
                  className="
                    hidden md:inline
                    text-sm
                    bg-slate-800
                    text-slate-200
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {user?.fullName} [{role}]
                </span>

                <button
                  onClick={handleLogout}
                  className="
                    bg-red-600
                    hover:bg-red-700
                    px-4
                    py-2
                    rounded-lg
                    text-white
                    transition
                  "
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}