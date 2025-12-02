import React from "react";
import { Outlet } from "react-router-dom";
import SocketProvider from "../socket/SocketProvider";

function ChatProvider() {
  return (
    <>
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    </>
  );
}

export default ChatProvider;
