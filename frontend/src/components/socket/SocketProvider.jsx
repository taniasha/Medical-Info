import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

function SocketProvider({ children }) {
  const [mySocket, setMySocket] = useState(null);
  const auth = useSelector((state) => state.auth);
  const mobile = useSelector((state) => state.auth.mobile);

  useEffect(() => {
    if (!auth.role || !mobile) return; // wait until both are defined

    const socket = io("http://localhost:3000", { withCredentials: true });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      socket.emit("save-id", { mobile }); // send mobile only when available

      setMySocket(socket); // now the socket is ready for both user and pharmacist
    });

    return () => {
      socket.disconnect(); // cleanup
    };
  }, [auth.role, mobile]);

  return (
    <SocketContext.Provider value={mySocket}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
