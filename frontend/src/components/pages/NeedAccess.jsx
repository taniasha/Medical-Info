import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function NeedAccess({ children }) {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      setIsAllowed(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "UnAuthorized User!!! <br> Access Denied",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(-1);
      });
    }
  }, []);

  return <>{isAllowed ? children : ""}</>;
}

export default NeedAccess;
