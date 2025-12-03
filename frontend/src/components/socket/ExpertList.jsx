import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import UserHeader from "../user/UserHeader";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
const backendBase = import.meta.env.VITE_API_URL;

function ExpertList() {
  const [expertList, setExpertList] = useState([]);
  const [onlineExperts, setOnlineExperts] = useState([]); 
  const navigate = useNavigate();
  const mySocket = useContext(SocketContext);

  // Listen for online experts
  useEffect(() => {
    if (!mySocket) return;

    mySocket.on("update-online", (mobiles) => {
      console.log("Online experts:", mobiles);
      setOnlineExperts(mobiles);
    });

    return () => {
      mySocket.off("update-online");
    };
  }, [mySocket]);

  // Fetch all experts
 useEffect(() => {
  async function getData() {
    try {
      const res = await axios.get(`${backendBase}/API/pharmacist/`, { withCredentials: true });
      // Make sure we assign an array
      setExpertList(res.data.pharmacists || []); 
    } catch (error) {
      console.error("Error fetching experts:", error);
      setExpertList([]); // fallback to empty array
    }
  }
  getData();
}, []);


  const handleExpert = (mobile) => {
    navigate(`${backendBase}/user/chat-with-expert`, { state: mobile });
  };

  return (
    <>
      <UserHeader />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <UserCircleIcon className="h-8 w-8 text-indigo-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">Expert List</h2>
        </div>

        {expertList.length === 0 ? (
          <p className="text-gray-500">No experts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertList.map((e, idx) => {
              const status = onlineExperts.includes(e.mobile) ? "online" : "offline";

              return (
                <div
                  key={idx}
                  onClick={() => status === "online" && handleExpert(e.mobile)}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xl font-semibold text-indigo-700">{e.name}</p>
                    <span className="flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full mr-1 ${
                          status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></span>
                      <span
                        className={`text-sm ${
                          status === "online" ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {status}
                      </span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-medium">📞 Mobile:</span> {e.mobile}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">🕒 Available:</span>{" "}
                      {e.availableTime.start} – {e.availableTime.end}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default ExpertList;
