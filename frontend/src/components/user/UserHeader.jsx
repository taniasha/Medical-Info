import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import GeneralModal from "../pages/GeneralModal.jsx";

function Header() {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModelOpen] = useState(false);

  const handleSignOut = async () => {
    const res = await axios.get("/API/signout", {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch(signout());
      navigate("/");
    }
  };

  const orderMedicine = () => {
    navigate("/medicine/order");
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Modal */}
        <GeneralModal
          open={isModalOpen}
          setOpen={setIsModelOpen}
          title="Signout"
          message="Are you sure you want to Logout? This action cannot be undone."
          onConfirm={() => {
            handleSignOut();
            setIsModelOpen(false);
          }}
          confirmText="Signout"
          cancelText="Cancel"
        />

        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-blue-600">Medical Info App</h1>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {role == "user" ? (
            <>
              <button
                onClick={()=> navigate("/")}
                className="text-sm text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Home
              </button>
              <button
                onClick={orderMedicine}
                className="text-sm text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Order Medicine
              </button>
              <button
                onClick={() => navigate("/user/chat/expert-list")}
                className="text-sm text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Chat with expert
              </button>
              <button
                onClick={() => setIsModelOpen(true)}
                className="text-sm text-gray-700 hover:text-red-600 transition font-medium"
              >
                Sign Out &rarr;
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="text-sm text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Sign up &rarr;
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="text-sm text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Sign In &rarr;
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
