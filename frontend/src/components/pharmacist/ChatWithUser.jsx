import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";
const backendBase = import.meta.env.VITE_API_URL;

const ChatWithUser = () => {
  const navigate = useNavigate();
  const mySocket = useContext(SocketContext);
  const location = useLocation();
  const mobile = location.state;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const from = useSelector((state) => state.auth.mobile);

  const bottomRef = useRef(null);

  useEffect(() => {
    async function getMessages() {
      if (mobile && from) {
        const res = await axios.get(`${backendBase}/API/messages`, {
          params: {
            from,
            to: mobile,
          },
          withCredentials: true,
        });

        setMessages(res.data);
      }
    }

    getMessages();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const res = await axios.get(`{backendBase}/API/user/find-user`, {
        params: { mobile },
        withCredentials: true,
      });
      if (res.data.success) setName(res.data.user.name);
    }

    fetchUser();
  }, [mobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleReceive = (data) => {
    setMessages((prev) => [
      ...prev,
      { from: mobile, to: from, message: data, date: Date.now() },
    ]);
  };

  useEffect(() => {
    if (!mySocket) return;
    mySocket.on("receive", handleReceive);

    return () => {
      mySocket.off("receive", handleReceive);
    };
  }, [mySocket, mobile]);

  const sendMessage = () => {
    setMessages((prev) => [
      ...prev,
      { from: from, to: mobile, message: message, date: Date.now() },
    ]);

    mySocket.emit("message", { message, from, to: mobile });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="w-full p-3 bg-gray-800 text-white flex items-center gap-4 shadow">
        {/* Back Button */}
        <button
          className="text-white text-xl font-bold"
          onClick={() => navigate(-1)}
        >
          &larr;
        </button>

        {/* Profile Initial */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-bold">
          {name?.charAt(0).toUpperCase()}
        </div>

        {/* Name & Mobile */}
        <div className="flex flex-col">
          <p className="text-md font-semibold">{name}</p>
          <p className="text-xs opacity-80">{mobile}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow ${
              m.from === from
                ? "bg-green-100 text-gray-800 self-end ml-auto"
                : "bg-white text-gray-800 self-start mr-auto"
            }`}
          >
            {m.message}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      <div className="flex items-center p-4 gap-2 border-t">
        <input
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter" && message.trim() !== "") {
              sendMessage();
            }
          }}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithUser;
