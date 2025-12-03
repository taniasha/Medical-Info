import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import GeneralModal from "../pages/GeneralModal";
const backendBase = import.meta.env.VITE_API_URL;

function OwnerHeader() {
  const isToken = useSelector((state) => state.auth.status);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModelOpen] = useState(false);

  const handleSignOut = async () => {
    const res = await axios.get(`${backendBase}/API/signout`, {
      withCredentials: true,
    });

    dispatch(signout());
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <GeneralModal
        open={isModalOpen}
        setOpen={setIsModelOpen}
        title="Sign Out"
        message="Are you sure you want to logout? This action cannot be undone."
        onConfirm={() => {
          handleSignOut();
          setIsModelOpen(false);
        }}
        confirmText="Sign Out"
        cancelText="Cancel"
      />

      <h1
        onClick={() => navigate("/")}
        className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
      >
        Medical Info App
      </h1>

      <div className="flex items-center">
        {isToken ? (
          <button
            onClick={() => setIsModelOpen(true)}
            className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 transition"
          >
            Sign Out &rarr;
          </button>
        ) : (
          <button
            onClick={() => navigate("/admin/signin")}
            className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 transition"
          >
            Sign In &rarr;
          </button>
        )}
      </div>
    </header>
  );
}

export default OwnerHeader;
