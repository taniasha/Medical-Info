import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";

function ChatWithExpert() {
  const mySocket = useContext(SocketContext);
  const location = useLocation();
  const expertMobile = location.state; // received from ExpertList
  const userMobile = useSelector((state) => state.auth.mobile);

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Receive messages
  useEffect(() => {
    if (!mySocket) return;

    mySocket.on("receive", ({ from, message }) => {
      setMessages((prev) => [...prev, { from, message }]);
    });

    return () => {
      mySocket.off("receive");
    };
  }, [mySocket]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    mySocket.emit("message", {
      from: userMobile,
      to: expertMobile,
      message: newMsg,
    });
    setMessages((prev) => [...prev, { from: userMobile, message: newMsg }]);
    setNewMsg("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Chat with {expertMobile}</h2>

      <div className="border rounded p-4 h-96 overflow-y-auto mb-4 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.from === userMobile ? "bg-indigo-100 self-end" : "bg-gray-200 self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWithExpert;
