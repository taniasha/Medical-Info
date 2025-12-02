import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [isAllowed, setIsAllowed] = useState(false);
  // console.log(authStatus);

  useEffect(() => {
    if (!authStatus) {
      Swal.fire({
        icon: "error",
        title: "UnAuthorized User!!! <br> Access Denied",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(-1);
      });
    } else {
      setIsAllowed(true);
    }
  }, []);

  return <>{isAllowed ? children : ""}</>;
}

export default AuthLayout;
